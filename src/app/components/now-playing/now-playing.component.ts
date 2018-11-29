import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  playingTrack = {};
  myflag = false;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.musicService.playingTrack.subscribe(() => {
     if (!this.myflag) {
       //this.items = this.musicService.getMusic();
       this.myflag = true;
     }

      this.playingTrack = this.musicService.getPlayingTrack();

    });
  }

}
