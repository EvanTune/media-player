import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {VgAPI, VgMedia} from 'videogular2/core';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs = [];
  trackInfo = {};
  api: VgAPI;
  playingTrack = {};
  columns = [
    {header: 'Title', name: 'title', hide: '0', faded: false, sort: true},
    {header: 'Album', name: 'album', hide: '1400', faded: true, sort: true},
    {header: 'Artist', name: 'artist', hide: '1400', faded: true, sort: true},
    {header: 'Time', name: 'time', hide: '0', faded: true, sort: true}
  ];
  options = {};

  constructor(
    public musicService: MusicService
  ) { }

  ngOnInit() {
    console.log('gee');
    this.songs = this.musicService.getMusic();
    this.playingTrack = this.musicService.getPlayingTrack();

    this.musicService.playingTrack.subscribe(() => {

      this.playingTrack = this.musicService.getPlayingTrack();

    });
  }

  songClicked(item) {
    this.musicService.setPlayingTrack(item);
    this.playingTrack = item;
    console.log('ffff');
  }

}
