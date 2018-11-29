import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  store = new ElectronStore();
  public colorTheme = new BehaviorSubject<string>('theme-dark');
  musicFolders = new BehaviorSubject<any>([]);



  setTheme(newTheme) {
    this.colorTheme.next(newTheme);
    this.store.set('color-theme', newTheme);
  }

  getTheme() {

    const preTheme = this.store.get('color-theme');

    if (preTheme) {
      return preTheme;
    } else {
      return 'theme-dark';
    }

  }


}
