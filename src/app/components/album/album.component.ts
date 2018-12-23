import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {ActivatedRoute} from '@angular/router';
import {PlaybackService} from '../../services/playback.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album = [];
  options = {};
  columns = [
    {header: '#', name: 'trackPos', hide: '0', faded: false, width: 'small', type: 'track', numeric: true},
    {header: 'Title', name: 'title', hide: '0', faded: false, numeric: false, type: 'main'},
    {header: 'Album', name: 'album', hide: '1400', faded: true, numeric: false},
    {header: 'Artist', name: 'artist', hide: '1400', faded: true, numeric: false},
    {header: 'Time', name: 'time', hide: '0', faded: true, numeric: false}
  ];

  constructor(
    private musicService: MusicService,
    private playbackService: PlaybackService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const artistName = this.route.snapshot.params['artistName'];
    const albumName = this.route.snapshot.params['albumName'];
    this.album = this.musicService.findAlbum(artistName, albumName);
  }

}
