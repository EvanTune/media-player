import {Injectable} from '@angular/core';
import ElectronStore from 'electron-store';
import {MusicService} from './music.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  store = new ElectronStore();

  constructor(
    private musicService: MusicService
  ) {
  }

  // Playlists

  getPlaylists() {
    return this.store.get('playlists') || [];
  }

  playlistExists(name) {

    const playlists = this.getPlaylists();
    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['name'].toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }
    return false;

  }

  getPlaylist(playlistId) {

    let playlist = {};
    const playlists = this.getPlaylists();

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['id'] === parseInt(playlistId, 10)) {
        playlist = playlists[i];
      }
    }

    const music = this.musicService.getMusic();
    const tracks = [];

    for (let i = 0; i < music.length; i++) {
      if (music[i]['playlists'] && music[i]['playlists'].length > 0) {
        if (music[i]['playlists'].includes(parseInt(playlistId, 10))) {
          tracks.push(music[i]);
        }
      }
    }
    playlist['tracks'] = tracks;
    return playlist;
  }

  newPlaylist(name, desc, icon) {

    const playlists = this.getPlaylists();

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['name'].toLowerCase() === name.toLowerCase()) {
        return false;
      }
    }
    playlists.push({
      name: name,
      desc: desc,
      icon: icon,
      id: this.getHighestId(playlists) + 1
    });
    this.store.set('playlists', playlists);
    return true;

  }


  addTrackToPlaylist(trackId, playlistId) {

    const music = this.musicService.getMusic();
    for (let i = 0; i < music.length; i++) {

      if (music[i]['id'] === trackId) {

        if (music[i]['playlists'] && music[i]['playlists'].length > 0) {

          let found = false;

          for (let j = 0; j < music[i]['playlists'].length; j++) {
            if (music[i]['playlists'][j] === playlistId) {
              music[i]['playlists'].splice(j, 1);
              found = true;
            }
          }

          if (!found) {
            music[i]['playlists'].push(playlistId);
          }

        } else {
          music[i]['playlists'] = [playlistId];

        }
        this.musicService.setMusic(music);
      }
    }

  }

  resetPlaylists() {
    this.store.set('playlists', []);

    const music = this.musicService.getMusic();

    for (let i = 0; i < music.length; i++) {
      music[i]['playlists'] = [];
    }
  }

  getHighestId(array) {

    let number = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i]['id'] > number) {
        number = array[i]['id'];
      }
    }
    return number;
  }

}
