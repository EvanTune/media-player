import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PlaylistService} from '../../services/playlist.service';
import {MusicService} from '../../services/music.service';
import {EtTableComponent} from '../et-table/et-table.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist = {};
  columns = [
    {header: 'Title', name: 'title', hide: '0', faded: false, sort: true, type: 'main'},
    {header: 'Album', name: 'album', hide: '1300', faded: true, sort: true},
    {header: 'Artist', name: 'artist', hide: '1300', faded: true, sort: true},
    {header: 'Time', name: 'time', hide: '0', faded: true, sort: true}
  ];
  options = {};
  activeRoute = '';

  @ViewChild('etTable')
  private etTable: EtTableComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private musicService: MusicService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPlaylist();
      this.cdRef.detectChanges();
      this.etTable.updateOnParamChange();
    });
  }

  getPlaylist() {
    this.activeRoute = this.route.snapshot.params['playlistId'];
    this.playlist = this.playlistService.getPlaylist(this.activeRoute);
  }

}
