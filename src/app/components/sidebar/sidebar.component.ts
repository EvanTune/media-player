import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MusicService} from '../../services/music.service';
import {PlaylistService} from '../../services/playlist.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() type;
  @Output() sidebarChanged = new EventEmitter<boolean>();
  playlists = [];
  showPlaylistModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private musicService: MusicService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    //this.playlistService.resetPlaylists();
    this.playlists = this.playlistService.getPlaylists();
  }

  setActiveClass(route) {

    let classes = 'sidebar__item';

    if (this.router.url.startsWith(route)) {
      classes += ' sidebar__item--active';
    }

    return classes;
  }

  goBack() {
    this.location.back();
  }


  updatePlaylists() {
    this.playlists = this.playlistService.getPlaylists();
    this.showPlaylistModal = false;
  }


}
