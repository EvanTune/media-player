import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StateService} from '../../services/state.service';
import {VgAPI, VgMedia} from 'videogular2/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  type = 'music-songs';
  api: VgAPI;
  id = 0;
  childRoute = '/music/songs';
  showMenu = true;

  fs = require('fs');
  jsmediatags = require('jsmediatags');

  constructor(
    private stateService: StateService,
    private router: Router,
    public musicService: MusicService,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val);
        this.childRoute = val['url'];
        this.showMenu = val['url'] === '/music' || val['url'] === '/music/songs' || val['url'] === '/music/albums' || val['url'] === '/music/artists';
      }
    });
  }

  ngOnInit() {
  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  setMenuClasses(url) {

    let classes = 'tab-menu__item';

    if (this.childRoute.startsWith(url)) {
      classes += ' tab-menu__item--active';
    }

    return classes;
  }

}
