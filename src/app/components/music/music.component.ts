import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  type = 'music-songs';
  music = [{
    'title': 'Test music 1',
    'time': '3:53'
  }];
  listMode = false;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.type = this.stateService.getStateValue('type');
    this.stateService.state.subscribe((data) => {
      this.listMode = this.stateService.isListMode();
    });

  }

  setState(value) {
    this.type = this.stateService.setState('type', value);
  }

}
