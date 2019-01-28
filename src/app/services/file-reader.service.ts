import {Injectable} from '@angular/core';
import {readdirSync, statSync} from 'fs';
import * as path from 'path';
import {MusicService} from './music.service';
import {PlaybackService} from './playback.service';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  jsmediatags = require('jsmediatags');
  fs = require('fs');
  filesBeingScanned = 0;
  getMP3Duration = require('get-mp3-duration');
  albumImagePath = (require('electron').remote.app.getPath('pictures') + '/et-music-player-albums').split('\\').join('/');

  constructor(
    private musicService: MusicService,
    private playbackService: PlaybackService
  ) {
  }

  // Gets all folders and sub folders from an array of paths
  getAllFolders(folderPaths) {

    let folders: string[] = [];

    for (let i = 0; i < folderPaths.length; i++) {
      folders = folders.concat(this.getAllSubFolders(folderPaths[i]));
    }

    return folders.concat(folderPaths);

  }

  // Recursively walks through folder to find all sub folders
  getAllSubFolders(baseFolder, folderList = []) {

    const folders: string[] = readdirSync(baseFolder).filter(file => statSync(path.join(baseFolder, file)).isDirectory());

    folders.forEach(folder => {
      folderList.push(path.join(baseFolder, folder));
      this.getAllSubFolders(path.join(baseFolder, folder), folderList);
    });

    return folderList;

  }


  // Gets all the file paths from a given array of folder paths
  getAllFilesFromFolders(folderPaths, formatArray) {

    const filePaths = [];

    folderPaths.forEach((folder) => {
      const files: string[] = this.fs.readdirSync(folder);

      files.forEach((file) => {

        const fullFilePath = folder + '/' + file;
        const stat = this.fs.lstatSync(fullFilePath);

        if (!stat.isDirectory()) {

          for (let i = 0; i < formatArray.length; i++) {
            if (path.extname(fullFilePath) === '.' + formatArray[i]) {
              filePaths.push({
                'folderPath': folder,
                'filePath': fullFilePath
              });
              break;
            }
          }
        }

      });

    });

    return filePaths;

  }

  processAudioFiles(paths, callback) {

    const newMedia = [];
    this.filesBeingScanned = paths.length;


    paths.forEach((fileInfo) => {
      this.readAudioFile(fileInfo, newMedia, () => {
        callback(newMedia);
      });
    });

  }

  // Reads a file path using the jsmediatags library
  readAudioFile(fileInfo, newMedia, callback) {

    this.jsmediatags.read(fileInfo['filePath'], {
      onSuccess: (tag) => {

        const tags = tag.tags;

        // Check if file is MP3 and that it is valid
        if (tag['type'] === 'ID3' && tags['title']) {
          const buffer = this.fs.readFileSync(fileInfo['filePath']);
          const duration = this.getMP3Duration(buffer);
          this.pushNewMusicToArray(fileInfo, newMedia, tags, duration);
          this.imageStuff(tags);
        }

        this.afterFileReadEvent(callback);

      },
      onError: (error) => {
        this.afterFileReadEvent(callback);
      }
    });

  }

  afterFileReadEvent(callback) {
    this.filesBeingScanned--;
    if (this.filesBeingScanned === 0) {
      callback();
      this.playbackService.setPlayingTrack({});
    }
  }

  imageStuff(tags) {
    const imageData = tags.picture;
    let image = '';

    if (imageData) {
      let base64String = '';
      for (let i = 0; i < imageData.data.length; i++) {
        base64String += String.fromCharCode(imageData.data[i]);
      }
      image = window.btoa(base64String);

      const imageName = tags.album.split(' ').join('-');

      if (!this.fs.existsSync(this.albumImagePath)) {
        this.fs.mkdirSync(this.albumImagePath);
      }

      this.fs.writeFileSync(this.albumImagePath + '/' + imageName + '.jpeg', image, 'base64');
    }
  }

  pushNewMusicToArray(fileInfo, newMedia, tags, duration) {

    const oldMedia = this.musicService.getMusic();

    if (this.unique(oldMedia, tags.title + tags.album) &&
      this.unique(newMedia, tags.title + tags.album)) {

      const newTrack = {};

      newTrack['id'] = tags.title + tags.album;
      newTrack['title'] = tags.title;
      newTrack['album'] = tags.album;
      newTrack['album-dashed'] = tags.album.split(' ').join('-');
      newTrack['artist'] = tags.artist;
      newTrack['artist-dashed'] = tags.artist.split(' ').join('-');
      newTrack['genre'] = tags['TCON'] ? tags['TCON']['data'] : '';
      newTrack['trackPos'] = tags['track'];
      newTrack['favourited'] = false;
      newTrack['time'] = this.msToTime(duration);
      newTrack['filePath'] = fileInfo['filePath'];
      newTrack['folderPath'] = fileInfo['folderPath'];

      if (tags['picture']) {
        newTrack['picture'] = true;
      }

      newMedia.push(newTrack);

    }

  }

  unique(array, propertyName) {

    for (let i = 0; i < array.length; i++) {
      if (array[i]['id'] === propertyName) {
        return false;
      }

    }
    return true;
  }

  msToTime(ms) {

    const hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor(((ms % 360000) % 60000) / 1000);

    if (hours > 0) {
      return hours + ':' + minutes + ':' + seconds;
    } else {

      if (minutes < 10) {
        // @ts-ignore
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        // @ts-ignore
        seconds = '0' + seconds;
      }

      return minutes + ':' + seconds;

    }

  }

}
