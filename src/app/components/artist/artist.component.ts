import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MusicService} from '../../services/music.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist = [];
  albums = [];
  options = {
    sorting: false,
  };
  columns = [
    {header: 'Title', name: 'title', hide: '0', faded: false},
    {header: 'Album', name: 'album', hide: '1400', faded: true},
    {header: 'Artist', name: 'artist', hide: '1400', faded: true},
    {header: 'Time', name: 'time', hide: '0', faded: true}
  ];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService
  ) { }

  ngOnInit() {
    let artistName = this.route.snapshot.params['artistName'];
    this.artist = this.musicService.findArtist(artistName);

    this.albums = this.musicService.getAlbumsFromArtist(artistName);
  }

  songClicked(hi) {

}

}
