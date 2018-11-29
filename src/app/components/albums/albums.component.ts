import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums = [];

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    console.log(this.musicService.getMusic());
    this.albums = this.musicService.getAlbums();
  }

}
