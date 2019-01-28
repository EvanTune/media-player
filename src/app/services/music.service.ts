import {Injectable} from '@angular/core';
import ElectronStore from 'electron-store';
import {VgAPI, VgMedia} from 'videogular2/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  store = new ElectronStore();

  id = 0;
  music = new BehaviorSubject([]);
  audioBooks = new BehaviorSubject([]);
  api: VgAPI;
  fs = require('fs');
  jsmediatags = require('jsmediatags');

  musicId = 'music';
  audioBooksId = 'audioBooks';
  musicFoldersId = 'musicFolders';
  audioBooksFoldersId = 'audioBooksFolders';

  history = new BehaviorSubject([]);

  constructor() {
  }

  // Music
  getMusic() {
    return this.store.get(this.musicId) || [];
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

  appendMusic(newMusic) {
    let music = this.getMusic();
    music = music.concat(newMusic);

    this.music.next(music);
    return this.store.set(this.musicId, music);
  }

  setMusic(newMusic) {
    this.music.next(newMusic);
    return this.store.set(this.musicId, newMusic);
  }

  clearMusic() {
    return this.store.set(this.musicId, []);
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


  // Media folders
  getFolders(type) {
    return this.store.get(type) || [];
  }

  setFolders(folders, type) {
    this.store.set(type, folders);
  }

  clearFolders(type) {
    this.store.set(type, []);
  }

  addFolders(folderPaths, type) {

    let folders = [];

    folders = this.getFolders(this.musicFoldersId);
    type = this.musicFoldersId;

    folderPaths.forEach((folderPath, index) => {
      if (folders.indexOf(folderPaths[index]) === -1) {
        folders.push(folderPath);
      }
    });

    folders.concat(folderPaths);

    this.store.set(type, folders);
  }

  removeFolders(foldersToRemove, folderType) {

    let folders = this.getFolders(this.musicFoldersId);
    const mediaArray = this.getMusic();

    for (let i = 0; i < foldersToRemove.length; i++) {

      let folderIndex = folders.length;

      while (folderIndex--) {

        if (foldersToRemove[i]['folderPath'] === folders[folderIndex]) {
          folders.splice(folderIndex, 1);
        }
      }

      let mediaIndex = mediaArray.length;

      while (mediaIndex--) {
        if (mediaArray[mediaIndex]['folderPath'].includes(foldersToRemove[i]['folderPath'])) {
          mediaArray.splice(mediaIndex, 1);
        }
      }

    }

    if (mediaArray.length === 0) {
      folders = [];
    }

    this.setMusic(mediaArray);


    this.store.set(folderType, folders);
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


  // HISTORY
  setHistory(historyArr) {
    this.history.next(historyArr);
  }

  appendHistory(currentRoute: string) {

    const history = this.history.value;

    history.unshift(currentRoute);
    if (history.length > 10) {
      history.pop();
    }
    this.history.next(history);
    console.log(history);
  }


  clearHistory() {
    this.setHistory([]);
  }

  removeHistoryAtIndex(index) {
    const history = this.history.value;
    history.splice(index, 1);
    this.history.next(history);
  }

  goToPage(path: string, router: Router, addToHistory: boolean) {
    if (addToHistory) {
      this.appendHistory(router.url);
    } else {
      this.removeHistoryAtIndex(0);
    }
    router.navigate([path]);
  }

  goBack(router: Router) {
    if (this.history.value.length > 0) {
      this.goToPage(this.history.value[0], router, false);
    }

  }

}
