import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {PlaybackService} from '../../services/playback.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {

  playingTrack = {};
  items = [];

  constructor(
    private musicService: MusicService,
    private playbackService: PlaybackService
  ) { }

  ngOnInit() {

    this.items = this.playbackService.getRecentlyPlayed();

    this.playbackService.playingTrack.subscribe(() => {
      this.playingTrack = this.playbackService.getPlayingTrack();
      if (!this.isEmpty(this.playingTrack)) {
        this.playbackService.setRecentlyPlayed(this.playingTrack);
      }
      this.items = this.playbackService.getRecentlyPlayed();
    });

  }

  isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  songClicked(item) {
    this.playbackService.playNewTrack(item, false);
    this.playingTrack = item;
  }

  setClasses(index) {
    return 'recently-played__item recently-played__item--' + parseInt(index + 1, 10);
  }

}
