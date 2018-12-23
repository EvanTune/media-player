import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {PlaybackService} from '../../services/playback.service';
import {NgScrollbar, ScrollToOptions} from 'ngx-scrollbar';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  playingTrack = {};
  musicQueue = [];
  myflag = false;
  iconStatus = '';
  animation = false;

  @ViewChild(NgScrollbar) scrollRef: NgScrollbar;

  constructor(
    private musicService: MusicService,
    private playbackService: PlaybackService
  ) {
  }

  ngOnInit() {

    // Update queue and scroll when queue changes
    this.playbackService.queue.subscribe(() => {

      this.musicQueue = this.playbackService.getMusicQueue();
      this.setScrollTop(0);

    });

    this.playbackService.playingTrack.subscribe((val) => {

      this.playingTrack = val;
      this.musicQueue = this.playbackService.getMusicQueue();
      this.setScrollTop(500);

    });

    // Set the shuffle icon
    this.playbackService.shuffle.subscribe((val) => {
      if (val) {
        this.iconStatus = 'shuffle';
      } else if (!this.playbackService.getRepeat()) {
        this.iconStatus = '';
      }
    });

    // Set the repeat icon
    this.playbackService.repeat.subscribe((val) => {
      if (val) {
        this.iconStatus = 'repeat';
      } else if (!this.playbackService.getShuffle()) {
        this.iconStatus = '';
      }
    });

    this.playingTrack = this.playbackService.getPlayingTrack();
    this.musicQueue = this.playbackService.getMusicQueue();
    this.setScrollTop(0);

  }

  setScrollTop(animation) {

    let index = 1;

    for (let i = 0; i < this.musicQueue.length; i++) {

      if (this.musicQueue[i]['id'] === this.playingTrack['id']) {
        index = i;
        break;
      }

    }

    if (index > 2) {
      // @ts-ignore
      this.scrollRef.scrollTo({top: (index - 2) * 42 - 50, duration: animation}).subscribe();
    } else {
      // @ts-ignore
      this.scrollRef.scrollTo({top: 0, duration: 0}).subscribe();
    }

  }

  setItemClasses(track) {

    let classes = 'now-playing__item';

    if (this.playingTrack['id'] === track['id']) {
      classes += ' now-playing__item--active';
    }

    return classes;

  }

  setIconClasses() {
    let classes = 'now-playing__icon';

    if (this.iconStatus === 'shuffle') {
      classes += ' fas fa-random';
    } else if (this.iconStatus === 'repeat') {
      classes += ' fas fa-repeat';
    }

    return classes;
  }

}
