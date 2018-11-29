import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {until} from 'selenium-webdriver';
import titleIs = until.titleIs;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() type;
  @Input() items;
  @Output() showVideoPlayer = new EventEmitter<boolean>();
  playedId = 0;
  columns = [
    {header: 'Title', name: 'title', hide: '0', faded: false, sort: true},
    {header: 'Album', name: 'album', hide: '1400', faded: true, sort: true},
    {header: 'Artist', name: 'artist', hide: '1400', faded: true, sort: true},
    {header: 'Genre', name: 'genre', hide: '1400', faded: true, sort: true},
    {header: 'Time', name: 'time', hide: '0', faded: true, sort: true}
  ];
  options = {};

  constructor(
    private musicService: MusicService
  ) {
  }

  ngOnInit() {
  }

  songClicked(item) {
    this.musicService.setPlayingTrack(item);
    this.playedId = item['id'];
    console.log(this.playedId);
  }

  selectSong(id, title, artist, image, path) {
    /*
        this.songClicked.emit({
          'title': title,
          'artist': artist,
          'image': image,
          'path': path,
          'id': id,
        });
      }
    */
  }
}
