import {Component, OnInit} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {PlaybackService} from '../../services/playback.service';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  songs = [];
  api: VgAPI;
  columns = [
    {header: 'Title', name: 'title', hide: '0', faded: false, sort: true, type: 'main'},
    {header: 'Album', name: 'album', hide: '1400', faded: true, sort: true},
    {header: 'Artist', name: 'artist', hide: '1400', faded: true, sort: true},
    {header: 'Time', name: 'time', hide: '0', faded: true, sort: true}
  ];
  options = {type: 'favourites'};

  constructor(
    private playbackService: PlaybackService,
    private musicService: MusicService
  ) {
  }

  ngOnInit() {
    const tomato = this.musicService.getMusic();
    this.songs = tomato.filter((el) => {
      return el['favourited'];
    });
    this.playbackService.tracks = this.songs;

  }


}
