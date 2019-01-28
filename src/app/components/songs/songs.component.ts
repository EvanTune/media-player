import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {VgAPI, VgMedia} from 'videogular2/core';
import {PlaybackService} from '../../services/playback.service';
import {EtTableComponent} from '../et-table/et-table.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs = [];
  api: VgAPI;
  columns = [
    {header: 'Title', name: 'title', hide: '0', faded: false, sort: true, type: 'main'},
    {header: 'Album', name: 'album', hide: '1300', faded: true, sort: true},
    {header: 'Artist', name: 'artist', hide: '1300', faded: true, sort: true},
    {header: 'Duration', name: 'time', hide: '0', faded: true, sort: true}
  ];
  options = {};

  constructor(
    public musicService: MusicService,
    private playbackService: PlaybackService
  ) {
  }

  ngOnInit() {

    this.songs = this.musicService.getMusic();

    this.musicService.music.subscribe((val) => {
      this.songs = val;
    });
  }


}
