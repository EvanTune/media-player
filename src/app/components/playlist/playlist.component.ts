import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PlaylistService} from '../../services/playlist.service';
import {MusicService} from '../../services/music.service';
import {EtTableComponent} from '../et-table/et-table.component';
import {PlaybackService} from '../../services/playback.service';

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
    {header: 'Duration', name: 'time', hide: '0', faded: true, sort: true}
  ];
  options = {};
  activeRoute = '';
  totalAlbumTime = '';

  @ViewChild('etTable')
  private etTable: EtTableComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private playbackService: PlaybackService,
    private musicService: MusicService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPlaylist();
      this.cdRef.detectChanges();
      this.etTable.updateOnParamChange();
      this.totalAlbumTime = this.playbackService.getTotalTimeOfTracks(this.playlist['tracks']);
    });

    this.playlistService.playlistUpdated.subscribe(() => {
      this.getPlaylist();
    });
    this.totalAlbumTime = this.playbackService.getTotalTimeOfTracks(this.playlist['tracks']);
  }

  getPlaylist() {
    this.activeRoute = this.route.snapshot.params['playlistId'];
    this.playlist = this.playlistService.getPlaylist(this.activeRoute);
  }

  openEditPlaylistModal() {
    this.playlistService.showplaylistModal.next({show: true, mode: 'edit'});
    this.playlistService.editFieldsModal.next({
      name: this.playlist['name'],
      desc: this.playlist['desc'],
      icon: this.playlist['icon'],
      id: this.playlist['id'],
    });
  }

  deletePlaylist() {
    this.playlistService.deletePlaylist(this.playlist['id']);
  }

  playCurrentList() {

    this.playbackService.playFirst();

  }

}
