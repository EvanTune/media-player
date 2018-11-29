import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {

  playingTrack = {};
  items = [];

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {

    this.items = this.musicService.getRecentlyPlayed();

    this.musicService.playingTrack.subscribe(() => {
      this.playingTrack = this.musicService.getPlayingTrack();
      if (!this.isEmpty(this.playingTrack)) {
        this.musicService.setRecentlyPlayed(this.playingTrack);
      }
      this.items = this.musicService.getRecentlyPlayed();
    });

  }

  isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  songClicked(item) {
    this.musicService.setPlayingTrack(item);
    this.playingTrack = item;
  }

  setClasses(index) {
    return 'recently-played__item recently-played__item--' + parseInt(index + 1, 10);
  }

}
