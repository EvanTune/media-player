import { Component, OnInit } from '@angular/core';
import {MusicService} from '../../services/music.service';
import {Router} from '@angular/router';
import {FileReaderService} from '../../services/file-reader.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums = [];
  path = 'music';
  test = '';

  constructor(
    public musicService: MusicService,
    private router: Router,
    public fileReaderService: FileReaderService
  ) { }

  ngOnInit() {
    this.albums = this.musicService.getAlbums();
  }

}
