import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StateService} from '../../services/state.service';
import {VgAPI, VgMedia} from 'videogular2/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MusicService} from '../../services/music.service';
import {ImageService} from '../../services/image.service';
import * as fs from 'fs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  type = 'music-songs';
  allMusic = [];
  filteredMusic = [];
  listMode = false;
  trackInfo = {};
  api: VgAPI;
  id = 0;
  childRoute = '/music/songs';
  showMenu = true;

  fs = require('fs');
  jsmediatags = require('jsmediatags');

  constructor(
    private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    public musicService: MusicService,
    public imageService: ImageService,
    private location: Location
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

    //this.musicService.tesy();
    //this.imageService.addAlbumCovers();


  }



  updateFilteredItems(value) {

    if (value === 'music-songs') {
      this.filteredMusic = this.allMusic.slice(0);
    } else if (value === 'music-albums') {
      this.filteredMusic = this.unique(this.allMusic, 'album');
    } else if (value === 'music-artists') {
      this.filteredMusic = this.unique(this.allMusic, 'artist');
    }
  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  songClicked(object) {

    this.trackInfo = {
      'title': object['title'],
      'artist': object['artist'],
      'image': object['image'],
      'path': object['path'],
      'id': object['id']
    };

    this.updateAudioPlayer();

  }

  updateAudioPlayer() {
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
    setTimeout(() => {
      this.api.play();
    }, 100);
  }

  goBack() {
    this.location.back();
  }

  setMenuClasses(urls) {

    let classes = 'tab-menu__item';

    for (let i = 0; i < urls.length; i++) {
      if (this.childRoute === urls[i]) {
        classes += ' tab-menu__item--active';
      }
    }
    return classes;
  }

}
