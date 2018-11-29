import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  artists = [];

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.artists = this.musicService.getArtists();
  }

}
