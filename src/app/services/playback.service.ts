import {Injectable} from '@angular/core';
import ElectronStore from 'electron-store';
import {VgAPI, VgMedia} from 'videogular2/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  tracks = [];
  queue = new BehaviorSubject(<any>[]);
  playingTrack = new BehaviorSubject(<any>{});
  shuffle = new BehaviorSubject(<boolean>false);
  repeat = new BehaviorSubject(<boolean>false);

  api: VgAPI;
  fs = require('fs');
  jsmediatags = require('jsmediatags');

  store = new ElectronStore();

  constructor() {
  }

  // Currently playing track
  getPlayingTrack() {
    return this.store.get('playingTrack');
  }

  setPlayingTrack(value) {
    this.store.set('playingTrack', value);
    this.playingTrack.next(value);
  }

  // Recently played
  getRecentlyPlayed() {
    return this.store.get('recentlyPlayed') || [];
  }

  setRecentlyPlayed(track) {
    const recent = this.getRecentlyPlayed();
    track['played'] = new Date();
    recent.unshift(track);
    this.store.set('recentlyPlayed', recent);
  }

  clearRecentlyPlayed() {
    this.store.set('recentlyPlayed', []);
  }

  // Music Queue
  getMusicQueue() {
    return this.store.get('queue') || [];
  }

  setMusicQueue(queue) {
    this.store.set('queue', queue);
    this.queue.next(queue);
  }

  updateMusicQueue() {
    let queue = [];

    const shuffle = this.getShuffle();
    const repeat = this.getRepeat();

    if (shuffle) {
      queue = this.tracks.slice(0);
      this.shuffleArray(queue);
    } else if (repeat) {
      queue.push(this.playingTrack.value);
    } else {
      queue = this.tracks.slice(0);
    }
    this.setMusicQueue(queue);
  }

  clearMusicQueue() {
    this.setMusicQueue([]);
  }


  // Repeat
  getRepeat() {
    return this.store.get('repeat') || false;
  }

  setRepeat(repeat) {
    this.repeat.next(repeat);
    this.store.set('repeat', repeat);
  }


  // Shuffle
  getShuffle() {
    return this.store.get('shuffle') || false;
  }

  setShuffle(shuffle) {
    this.shuffle.next(shuffle);
    this.store.set('shuffle', shuffle);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Playback
  playNext() {
    let index = 0;
    const queue = this.getMusicQueue();

    for (let i = 0; i < queue.length; i++) {
      if (queue[i]['id'] === this.playingTrack['value']['id']) {
        if (i + 1 < queue.length) {
          index = i + 1;
        }
      }
    }

    this.playNewTrack(queue[index], false);
  }

  playPrev() {

    let index = 0;
    const queue = this.getMusicQueue();

    for (let i = 0; i < queue.length; i++) {
      if (queue[i]['id'] === this.playingTrack['value']['id']) {
        if (i === 0) {
          return;
        }

        index = i - 1;
      }
    }

    this.playNewTrack(queue[index], false);
  }

  playNewTrack(value, setQueue) {
    if (setQueue) {
      this.updateMusicQueue();
    }
    this.setPlayingTrack(value);
    this.updateAudioPlayer();
  }

  playFirst() {
    this.updateMusicQueue();
    this.setPlayingTrack(this.tracks[0]);
    this.updateAudioPlayer();
  }

  updateAudioPlayer() {
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
    setTimeout(() => {
      this.api.play();
    }, 50);
  }

  getTotalTimeOfTracks(tracks) {
    let second = 0;

    for (let i = 0; i < tracks.length; i++) {
      const arr = tracks[i]['time'].split(':');
      second += parseInt(arr[0], 10) * 60;
      second += parseInt(arr[1], 10);
    }

    return Math.floor(second / 60) + 'm ' + second % 60 + 's ';
  }

}
