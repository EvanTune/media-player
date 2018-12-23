import {Injectable} from '@angular/core';
import {readdirSync, statSync, existsSync} from 'fs';
import * as path from 'path';
import {MusicService} from './music.service';
import {PlaybackService} from './playback.service';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  jsmediatags = require('jsmediatags');
  fs = require('fs');
  folders = [];
  fileList = [];
  filesBeingScanned = 0;
  id = 0;

  constructor(
    private musicService: MusicService,
    private playbackService: PlaybackService
  ) {}

  // recursive synchronous "walk" through a folder structure, with the given base path
  getAllSubFolders(baseFolder, folderList = []) {

    const folders: string[] = readdirSync(baseFolder).filter(file => statSync(path.join(baseFolder, file)).isDirectory());

    folders.forEach(folder => {
      folderList.push(path.join(baseFolder, folder));
      this.folders.push(path.join(baseFolder, folder));
      this.getAllSubFolders(path.join(baseFolder, folder), folderList);
    });

  }

  getSubFolders() {
    return this.folders;
  }

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
              filePaths.push(fullFilePath);
              break;
            }
          }
        }

      });

    });

    return filePaths;

  }

  processAudioFiles(paths, callback) {

    this.filesBeingScanned = paths.length;

    paths.forEach((filePath) => {
      this.readAudioFile(filePath, () => {
        callback();
      });
    });

  }


  readAudioFile(filePath, callback) {
    this.jsmediatags.read(filePath, {
      onSuccess: (tag) => {

        const tags = tag.tags;
        const imageData = tags.picture;
        const image = '';

        /*
        if (imageData) {
          let base64String = '';
          for (let i = 0; i < imageData.data.length; i++) {
            base64String += String.fromCharCode(imageData.data[i]);
          }
          image = 'data:image/jpeg;base64,' + window.btoa(base64String);
        } */

        if (tag['type'] === 'ID3' && !this.objectExistsInArray(tags.title, 'title')) {

          this.fileList.push({
            'title': tags.title,
            'album': tags.album,
            'album-dashed': tags.album.split(' ').join('-'),
            'artist': tags.artist,
            'artist-dashed': tags.artist.split(' ').join('-'),
            'genre': tags['TCON'] ? tags['TCON']['data'] : '',
            'time': '3:53',
            'trackPos': tags['track'],
            'path': filePath,
            'favourited': false,
            'id': this.id++
          });
        }

       setTimeout(() => {
         this.filesBeingScanned--;
         if (this.filesBeingScanned === 0) {
           callback();
           this.folders = [];
           this.fileList = [];
           this.playbackService.setPlayingTrack({});
         }
       }, 2000);

      },
      onError: function (error) {
        console.log(':(', error.type, error.info);
      }
    });

  }

  objectExistsInArray(title, key) {
    return this.fileList.some(function(el) {
      return el[key] === title;
    });
  }

  readVideoFile(filePath) {

    this.jsmediatags.read(filePath, {
      onSuccess: (tag) => {

        const tags = tag.tags;
        console.log(tags);

        this.fileList.push({});

      },
      onError: function (error) {
        console.log(':(', error.type, error.info);
      }
    });

  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }
}
