import {Component, EventEmitter, HostListener, Input, OnInit} from '@angular/core';
import {PlaybackService} from '../../services/playback.service';
import {MusicService} from '../../services/music.service';
import {PlaylistService} from '../../services/playlist.service';

@Component({
  selector: 'app-et-table',
  templateUrl: './et-table.component.html',
  styleUrls: ['./et-table.component.scss']
})
export class EtTableComponent implements OnInit {

  @Input() items;
  @Input() columns;
  @Input() options;
  filteredItems = [];
  sortColumns = [];

  innerWidth: number;
  sortType = 'trackPos';
  sortAscending = true;

  playingTrack = {};

  showDropdown = false;
  dropdownTopOffset = 0;
  dropdownLeftOffset = 0;
  dropdownItems = [];
  dropdownPlaylistId = -1;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private playbackService: PlaybackService,
    private musicService: MusicService,
    private playlistService: PlaylistService
  ) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.sortType = this.columns[0]['name'];
    this.sortItems(this.columns[0]['name'], true, this.columns[0]['numeric'], false);

    for (let i = 0; i < this.columns.length; i++) {
      this.sortColumns.push({
        'mouseHover': false,
        'sortingAsc': true,
      });
    }

    this.playbackService.playingTrack.subscribe((val) => {
      this.playingTrack = val;
    });

    this.playingTrack = this.playbackService.getPlayingTrack();
    this.setDropDownItems();

  }

  updateOnParamChange() {
    this.sortItems(this.sortType, this.sortAscending, false, true);
  }

  setDropDownItems() {

    const array = [
      {title: 'Play track', clickable: true},
      {title: 'Add to favourites', clickable: true},
    ];

    const playlists = this.playlistService.getPlaylists();
    const playlistsObj = {title: 'Add to playlist', clickable: false, children: []};

    playlists.sort((a, b) => {
      return a['name'].localeCompare(b['name'], 'en', {numeric: false});
    });

    for (let i = 0; i < playlists.length; i++) {
      playlistsObj['children'].push({
        title: playlists[i]['name'],
        id: playlists[i]['id'],
        active: false,
        clickable: true,
        type: 'playlist'
      });
    }
    array.push(playlistsObj);
    this.dropdownItems = array;

  }


  editDropdownItems(track) {

    for (let i = 0; i < this.dropdownItems[2]['children'].length; i++) {

      this.dropdownItems[2]['children'][i]['active'] = false;

      if (track['playlists']) {
        for (let j = 0; j < track['playlists'].length; j++) {

          if (this.dropdownItems[2]['children'][i]['id'] === track['playlists'][j]) {
            this.dropdownItems[2]['children'][i]['active'] = true;
          }

        }
      }

    }

  }

  openDropdown(e, item) {
    e.stopImmediatePropagation();


    if (window.innerHeight - e.clientY < 250) {
      this.dropdownLeftOffset = e.clientX - 210;
      this.dropdownTopOffset = e.clientY - 160;
    } else {
      this.dropdownLeftOffset = e.clientX - 10;
      this.dropdownTopOffset = e.clientY - 10;
    }

    this.showDropdown = true;
    this.dropdownPlaylistId = item['id'];
    this.editDropdownItems(item);
  }

  addTrackToPlaylist(playlist) {
    this.playlistService.addTrackToPlaylist(this.dropdownPlaylistId, playlist['id']);

    for (let i = 0; i < this.filteredItems.length; i++) {
      if (this.filteredItems[i]['id'] === this.dropdownPlaylistId) {
        this.filteredItems[i] = this.musicService.getMusicTrackById(this.dropdownPlaylistId);
        this.editDropdownItems(this.filteredItems[i]);
      }
    }
  }

  setThClasses(column) {
    return 'et-table__th';
  }

  sortItems(key, sortingAsc, numeric, sortQueue) {

    this.filteredItems = this.items.sort((a, b) => {
      return a[key].localeCompare(b[key], 'en', {numeric: numeric});
    }).slice();

    if (!sortingAsc) {
      this.filteredItems.reverse();
    }
    this.playbackService.tracks = this.filteredItems.slice(0);

  }

  setItemClasses(item) {

    let classes = 'et-table__item';

    if (this.playingTrack['id'] === item['id']) {
      classes += ' et-table__item--active';
    }

    return classes;
  }

  setTdClasses(column) {

    let classes = 'et-table__td';

    if (column['faded']) {
      classes += ' et-table__td--faded';
    }

    if (column['width'] === 'small') {
      classes += ' et-table__td--small';
    }

    return classes;
  }

  setColumnContent(item, column) {

    if (column['type'] === 'track') {
      return item[column['name']].split('/')[0];
    } else {
      return item[column['name']];
    }

  }

  manageSortClasses(name, index) {

    let classes = 'fas et-table__sort-icon';

    if (this.sortColumns[index]['mouseHover']) {

      if (this.sortAscending && name === this.sortType) {
        classes += ' fa-angle-up';
      } else {
        classes += ' fa-angle-down';
      }

    } else {

      if (this.sortAscending) {
        classes += ' fa-angle-down';
      } else {
        classes += ' fa-angle-up';
      }

    }

    if (name === this.sortType || this.sortColumns[index]['mouseHover']) {
      classes += ' et-table__sort-icon--visible';
    }

    return classes;
  }

  setSortType(name, index, numeric) {
    if (this.sortType !== name) {
      this.sortAscending = true;
    } else {
      this.sortAscending = !this.sortAscending;
    }
    this.sortType = name;
    this.sortItems(name, this.sortAscending, numeric, true);

  }

  favourite(e, item) {
    e.stopImmediatePropagation();

    for (let i = 0; i < this.filteredItems.length; i++) {
      if (this.filteredItems[i]['id'] === item['id']) {
        this.filteredItems[i]['favourited'] = !item['favourited'];
        if (this.options['type'] === 'favourites') {
          this.filteredItems.splice(i, 1);
        }
      }
    }

    this.musicService.setFavourite(item, item['favourited']);
  }

  trackClicked(newTrack) {
    this.playbackService.playNewTrack(newTrack, true);
    this.playingTrack = newTrack;
  }

}
