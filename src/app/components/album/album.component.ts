import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  playingTrack = {};
  album = [];
  options = {};
  columns = [
    {header: '#', name: 'trackPos', hide: '0', faded: false, width: 'small', type: 'track', numeric: true},
    {header: 'Title', name: 'title', hide: '0', faded: false, numeric: false},
    {header: 'Album', name: 'album', hide: '1400', faded: true, numeric: false},
    {header: 'Artist', name: 'artist', hide: '1400', faded: true, numeric: false},
    {header: 'Time', name: 'time', hide: '0', faded: true, numeric: false}
  ];

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let artistName = this.route.snapshot.params['artistName'];
    let albumName = this.route.snapshot.params['albumName'];
    this.album = this.musicService.findAlbum(artistName, albumName);
    this.playingTrack = this.musicService.getPlayingTrack();

    this.musicService.playingTrack.subscribe(() => {

      this.playingTrack = this.musicService.getPlayingTrack();

    });
  }

  songClicked(item) {
    this.musicService.setPlayingTrack(item);
  }

}
