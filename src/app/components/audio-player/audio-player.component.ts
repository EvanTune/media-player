import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {VgAPI, VgMedia} from 'videogular2/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  trackInfo = {};
  preload = 'auto';
  api: VgAPI;

  constructor(
    private sanitizer: DomSanitizer,
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.musicService.playingTrack.subscribe(() => {
      this.trackInfo = this.musicService.getPlayingTrack();
    });
  }

  sanitizeUrl(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }

  onPlayerReady(api: VgAPI) {
    this.musicService.api = api;
  }

}
