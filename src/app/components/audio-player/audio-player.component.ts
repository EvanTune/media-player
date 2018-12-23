import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {VgAPI, VgMedia} from 'videogular2/core';
import {MusicService} from '../../services/music.service';
import {PlaybackService} from '../../services/playback.service';

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
    private musicService: MusicService,
    private playbackService: PlaybackService
  ) { }

  ngOnInit() {
    this.playbackService.playingTrack.subscribe((val) => {
      this.trackInfo = val;
    });
    this.trackInfo = this.playbackService.getPlayingTrack();
  }


  sanitizeUrl(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
  }

  onPlayerReady(api: VgAPI) {
    this.playbackService.api = api;

    this.playbackService.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.playbackService.playNext();
    });
  }



}
