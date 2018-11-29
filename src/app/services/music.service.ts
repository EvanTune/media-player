import {Injectable} from '@angular/core';
import ElectronStore from 'electron-store';
import {VgAPI, VgMedia} from 'videogular2/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  store = new ElectronStore();

  allMusic = [];
  recentlyPlayed = [];
  id = 0;
  api: VgAPI;

  fs = require('fs');
  jsmediatags = require('jsmediatags');

  playingTrack = new BehaviorSubject({});
  musicFolders = new BehaviorSubject<any>([]);

  constructor() {
  }

  getRecentlyPlayed() {
    return this.store.get('recentlyPlayed') || [];
  }

  setRecentlyPlayed(value) {

    const recentlyPlayed = this.store.get('recentlyPlayed') || [];
    this.store.set('recentlyPlayed', recentlyPlayed);

    if (recentlyPlayed && recentlyPlayed.length) {

      if (recentlyPlayed[0]['id'] === value['id']) {
        return;
      }

      if (recentlyPlayed.length > 5) {
        recentlyPlayed.pop();
      }

    }

    recentlyPlayed.unshift(value);

    this.store.set('recentlyPlayed', recentlyPlayed);
    this.recentlyPlayed = recentlyPlayed;

  }

  getPlayingTrack() {
    return this.playingTrack.value;
  }

  setPlayingTrack(value) {
    this.playingTrack.next(value);
    this.updateAudioPlayer();
  }

  updateAudioPlayer() {
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
    setTimeout(() => {
      this.api.play();
    }, 100);
  }

  getMusic() {
    return this.store.get('music');
  }

  setMusic(music) {
    return this.store.set('music', music);
  }

  getAlbums() {
    return this.unique(this.getMusic(), 'album');
  }

  getArtists() {
    return this.unique(this.getMusic(), 'artist');
  }

  findAlbum(artist, album) {
    return this.getMusic().filter(obj => obj['album'] === album);
  }

  getAlbumsFromArtist(artist) {
    const music = this.getMusic().filter(obj => obj['artist'] === artist);
    return this.unique(music, 'album');
  }

  findArtist(artist) {
    return this.getMusic().filter(obj => obj['artist'] === artist);
  }

  getMusicFolders() {
    return this.store.get('music-folders');
  }

  setMusicFolders(folders) {
    this.store.set('music-folders', folders);
  }

  addMusicFolders(folderPaths) {
    const folders = this.getMusicFolders();

    folderPaths.forEach((folderPath, index) => {
      if (folders.indexOf(folderPaths[index]) === -1) {
       folders.push(folderPath);
      }
    });

    folders.concat(folderPaths);
    this.store.set('music-folders', folders);
  }

  removeMusicFolder(index) {
    const folders = this.getMusicFolders();
    if (folders.length >= index) {
      folders.splice(index, 1);
      this.store.set('music-folders', folders);
    }
  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }



}
