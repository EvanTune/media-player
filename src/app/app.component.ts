import {Component, OnInit} from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {StateService} from './services/state.service';
import {PlaybackService} from './services/playback.service';
import {MusicService} from './services/music.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themeClass = 'theme-dark';

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private state: StateService,
    private playbackService: PlaybackService,
    private musicService: MusicService,
    private location: Location
  ) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(route.url);
      }
    });

    state.colorTheme.subscribe((value) => {
      this.themeClass = value;
      console.log(value);
    });

  }

  ngOnInit() {
    this.themeClass = this.state.getTheme();
    this.musicService.music.next(this.musicService.getMusic());
    this.playbackService.playingTrack.next(this.playbackService.getPlayingTrack());
  }
}

