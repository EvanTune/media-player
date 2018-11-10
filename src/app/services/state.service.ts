import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public state = new BehaviorSubject({
    'type': 'music-songs',
    'songsList': true,
    'albumsList': false,
    'artistsList': false,
    'videosList': false,
    'imagesList': false,
  });

  constructor() {}

  getStateValues() {
    return this.state.value;
  }

  getStateValue(key) {
    return this.state.value[key];
  }

  setState(key, value) {
    const state = this.state.value;
    state[key] = value;
    this.state.next(state);
    return this.state.value[key];
  }

  isListMode() {
    if (this.state.value['songsList'] && this.state.value['type'] === 'music-songs') {
      return true;
    } else if (this.state.value['albumsList'] && this.state.value['type'] === 'music-albums') {
      return true;
    } else if (this.state.value['artistsList'] && this.state.value['type'] === 'music-artists') {
      return true;
    }
    return false;
  }

}
