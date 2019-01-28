import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {PlaybackService} from '../../services/playback.service';
import {MusicService} from '../../services/music.service';
import {PlaylistService} from '../../services/playlist.service';
import {Subject} from 'rxjs';
import {TimeAgoPipe} from 'ngx-moment';

@Component({
  selector: 'app-et-table',
  templateUrl: './et-table.component.html',
  styleUrls: ['./et-table.component.scss'],
  providers: [
    TimeAgoPipe
  ],
})
export class EtTableComponent implements OnInit, OnChanges {

  @Input() items;
  @Input() columns;
  @Input() options;
  filteredItems = [];
  sortColumns = [];

  @Input() emptyText;

  innerWidth: number;
  sortType = 'trackPos';
  sortAscending = true;

  playingTrack = {};

  showDropdown = false;
  dropdownTopOffset = 0;
  dropdownLeftOffset = 0;
  dropdownItems = [];
  currentDropDownTrack = {};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private playbackService: PlaybackService,
    private musicService: MusicService,
    private playlistService: PlaylistService,
    private timeAgoPipe: TimeAgoPipe
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

  ngOnChanges(changes: SimpleChanges) {
    this.updateOnParamChange();
  }

  updateOnParamChange() {
    this.sortItems(this.sortType, this.sortAscending, false, true);
  }

  setDropDownItems() {

    const array = [
      {title: 'Add to favourites', clickable: true, type: 'favourited'},
    ];

    const playlists = this.playlistService.getPlaylists();
    const playlistsObj = {title: 'Add to playlist', clickable: false, children: [], type: null};

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

  openDropdown(e, item) {
    e.stopImmediatePropagation();

    if (window.innerHeight - e.clientY < 250) {
      this.dropdownLeftOffset = e.clientX;
      this.dropdownTopOffset = e.clientY - 160;
    } else {
      this.dropdownLeftOffset = e.clientX;
      this.dropdownTopOffset = e.clientY - 10;
    }

    this.showDropdown = true;
    this.currentDropDownTrack = item;
    this.editDropdownItems(item);
  }

  editDropdownItems(track) {

    if (track['favourited']) {
      this.dropdownItems[0]['title'] = 'Remove from favourites';
    } else {
      this.dropdownItems[0]['title'] = 'Add to favourites';
    }

    for (let i = 0; i < this.dropdownItems[1]['children'].length; i++) {

      this.dropdownItems[1]['children'][i]['active'] = false;

      if (track['playlists']) {
        for (let j = 0; j < track['playlists'].length; j++) {

          if (this.dropdownItems[1]['children'][i]['id'] === track['playlists'][j]) {
            this.dropdownItems[1]['children'][i]['active'] = true;
          }

        }
      }

    }

  }


  addTrackToPlaylist(playlist) {
    this.playlistService.addTrackToPlaylist(this.currentDropDownTrack['id'], playlist['id']);

    for (let i = 0; i < this.filteredItems.length; i++) {
      if (this.filteredItems[i]['id'] === this.currentDropDownTrack['id']) {
        this.filteredItems[i] = this.musicService.getMusicTrackById(this.currentDropDownTrack['id']);
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
    } else if (column['type'] === 'played') {
      return this.timeAgoPipe.transform(item[column['name']]);
    } else {
      return item[column['name']];
    }

  }

  dropDownItemClicked(track) {

    if (track['type'] === 'favourited') {
      this.favourite(this.currentDropDownTrack);
    } else {
      this.addTrackToPlaylist(track);
    }
    this.showDropdown = false;

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

  favourite(track, e = null) {
   if (e) {
     e.stopImmediatePropagation();
   }

    for (let i = 0; i < this.filteredItems.length; i++) {
      if (this.filteredItems[i]['id'] === track['id']) {
        this.filteredItems[i]['favourited'] = !track['favourited'];
        if (this.options['type'] === 'favourites') {
          this.filteredItems.splice(i, 1);
        }
      }
    }

    this.musicService.setFavourite(track, track['favourited']);
  }

  trackClicked(newTrack) {
    this.playbackService.playNewTrack(newTrack, true);
    this.playingTrack = newTrack;
  }

}
