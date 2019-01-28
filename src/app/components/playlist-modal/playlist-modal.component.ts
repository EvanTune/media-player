import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {PlaylistService} from '../../services/playlist.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit {

  showModal = false;
  mode = 'new';

  editName = '';
  editId = '';

  newModal = {
    name: '',
    desc: '',
    icon: 'wolf'
  };

  status = '';
  errorMsg = '';

  constructor(
    private musicService: MusicService,
    private playlistService: PlaylistService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.playlistService.showplaylistModal.subscribe((val) => {
      this.showModal = val['show'];
      this.mode = val['mode'];

      if (this.mode === 'new') {
        this.newModal = {
          name: '',
          desc: '',
          icon: 'wolf'
        };
      }
    });

    this.playlistService.editFieldsModal.subscribe((val) => {
      this.newModal = val;
      this.editName = val['name'];
      this.editId = val['id'];
    });
  }

  newPlaylist() {
    if (this.newModal['name'].length > 0) {
      const newPlaylist = this.playlistService.newPlaylist(this.newModal);
      this.playlistService.playlistsUpdated.next(true);
      this.playlistService.showplaylistModal.next({show: false, mode: 'new'});
      this.clearState();
      this.router.navigate(['/playlist/' + newPlaylist['id']]);
    }
  }

  editPlaylist() {
    this.playlistService.editPlaylist({
      name: this.newModal['name'],
      desc: this.newModal['desc'],
      icon: this.newModal['icon'],
      id: this.editId
    });
    this.playlistService.playlistUpdated.next(true);
    this.playlistService.playlistsUpdated.next(true);
    this.playlistService.showplaylistModal.next({show: false, mode: 'new'});
    this.clearState();
  }

  setInputClasses() {

    let classes = 'playlist-modal__input';

    if (this.status === 'valid') {
      classes += ' playlist-modal__input--valid';
    } else if (this.status === 'error') {
      classes += ' playlist-modal__input--error';
    }

    return classes;

  }

  checkInput() {

    if (this.newModal['name'].length === 0) {

      this.status = 'error';
      this.errorMsg = 'Playlist name cannot be empty.';

    } else if (this.playlistService.playlistExists(this.newModal['name'], this.editName)) {
      this.status = 'error';
      this.errorMsg = 'Playlist name already exists.';
    } else {
      this.status = 'valid';
    }

  }

  clearState() {
    this.newModal = {
      name: '',
      desc: '',
      icon: 'wolf'
    };
    this.status = '';
  }

  setActiveImg(type) {
    this.newModal['icon'] = type;
  }

  setImgClass(type) {

    let classes = 'playlist-modal__img';
    if (type === this.newModal['icon']) {
      classes += ' playlist-modal__img--active';
    }
    return classes;

  }

}
