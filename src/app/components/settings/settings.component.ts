import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  activeComponent = 'music-folders';
  @Input() showSettings;
  @Output() closeSettings = new EventEmitter();

  constructor(
    private router: Router,
    private musicService: MusicService
  ) {}

  ngOnInit() {
  }

  closeSettingsWindow() {
    console.log('ggg');
    this.closeSettings.emit();
  }

}
