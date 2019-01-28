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

  dropdownTopOffset = 70;
  dropdownLeftOffset = 25;
  showDropdown = false;
  dropdownItems = [
    {'title': 'New playlist', 'clickable': true},
    {'title': 'Settings', 'clickable': true}
  ];

  showSettings = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    public musicService: MusicService,
    public playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();

    this.playlistService.playlistsUpdated.subscribe(() => {
      this.playlists = this.playlistService.getPlaylists();
    });
  }

  itemClicked(e) {
    console.log(e);
    this.showSettings = true;
    this.showDropdown = false;
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
    this.playlistService.showplaylistModal.next({show: false, mode: 'new'});
  }


}
