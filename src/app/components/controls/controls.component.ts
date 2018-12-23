import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {PlaybackService} from '../../services/playback.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input() type;
  @Input() trackInfo;

  repeat = false;
  shuffle = false;

  constructor(
    private playbackService: PlaybackService
  ) {
  }

  ngOnInit() {
    this.repeat = this.playbackService.getRepeat();
    this.shuffle = this.playbackService.getShuffle();
  }

  setRepeat(value, check) {

    this.repeat = value;
    this.playbackService.setRepeat(value);
    if (check && this.shuffle) {
      this.setShuffle(false, false);
    }
      this.playbackService.setMusicQueue();
  }

  setShuffle(value, check) {
    this.shuffle = value;
    this.playbackService.setShuffle(value);
    if (check && this.repeat) {
      this.setRepeat(false, false);
    }
    this.playbackService.setMusicQueue();
  }

  playNext() {
    this.playbackService.playNext();
  }

  playPrev() {
    this.playbackService.playPrev();
  }

}
