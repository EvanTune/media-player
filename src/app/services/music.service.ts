import {Injectable} from '@angular/core';
import ElectronStore from 'electron-store';
import {VgAPI, VgMedia} from 'videogular2/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  store = new ElectronStore();

  id = 0;
  api: VgAPI;
  fs = require('fs');
  jsmediatags = require('jsmediatags');

  constructor() {
  }


  // Music
  getMusic() {
    return this.store.get('music');
  }

  getMusicTrackById(id) {

    const music = this.getMusic();

    for (let i = 0; i < music.length; i++) {
      if (music[i]['id'] === id) {
        return music[i];
      }
    }
    return null;
  }

  setMusic(music) {
    return this.store.set('music', music);
  }


  // Albums
  getAlbums() {
    return this.unique(this.getMusic(), 'album');
  }

  findAlbum(artist, album) {
    return this.getMusic().filter(obj => obj['album'] === album);
  }

  getAlbumsFromArtist(artist) {
    const music = this.getMusic().filter(obj => obj['artist'] === artist);
    return this.unique(music, 'album');
  }


  // Artists
  getArtists() {
    return this.unique(this.getMusic(), 'artist');
  }

  findArtist(artist) {
    return this.getMusic().filter(obj => obj['artist'] === artist);
  }


  // Music folders
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


  // Favourites
  setFavourite(track, value) {

    const music = this.getMusic();

    for (let i = 0; i < music.length; i++) {
      if (track['id'] === music[i]['id']) {
        music[i]['favourited'] = value;
        this.setMusic(music);
        return true;
      }
    }
    return false;
  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

}
