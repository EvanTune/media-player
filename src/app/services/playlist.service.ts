import {Injectable} from '@angular/core';
import ElectronStore from 'electron-store';
import {MusicService} from './music.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  store = new ElectronStore();
  showplaylistModal = new BehaviorSubject({show: false, mode: 'new'});
  editFieldsModal = new BehaviorSubject({name: '', desc: '', icon: 'wolf', id: '-1'});
  playlistsUpdated = new BehaviorSubject(true);
  playlistUpdated = new BehaviorSubject(true);

  constructor(
    private musicService: MusicService,
    private playlistService: PlaylistService,
    private router: Router
  ) {
  }

  // Playlists

  getPlaylists() {
    return this.store.get('playlists') || [];
  }

  setPlaylists(playlists) {
    this.store.set('playlists', playlists);
    this.playlistsUpdated.next(true);
  }

  deletePlaylist(id) {
    const playlists = this.getPlaylists();

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['id'] === id) {
        playlists.splice(i,1);
      }
    }

    this.router.navigate(['/music/songs']);
    this.setPlaylists(playlists);
  }

  playlistExists(newName, oldName = null) {

    const playlists = this.getPlaylists();

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['name'].toLowerCase() === newName.toLowerCase()) {
        return oldName.toLowerCase() !== playlists[i]['name'].toLowerCase();
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

  newPlaylist(playlist) {

    const playlists = this.getPlaylists();

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['name'].toLowerCase() === playlist['name'].toLowerCase()) {
        return false;
      }
    }
    const newPlaylist = {
      name: playlist['name'],
      desc: playlist['desc'],
      icon: playlist['icon'],
      id: this.getHighestId(playlists) + 1
    };
    playlists.push(newPlaylist);

    this.setPlaylists(playlists);
    return newPlaylist;

  }

  editPlaylist(playlist) {

    const playlists = this.getPlaylists();

    console.log(playlist);

    for (let i = 0; i < playlists.length; i++) {
      if (playlists[i]['id'] === playlist['id']) {
        playlists[i] = playlist;
      }
    }

    this.setPlaylists(playlists);

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
