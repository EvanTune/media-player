import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MusicService} from '../../services/music.service';
import {PlaylistService} from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss']
})
export class PlaylistModalComponent implements OnInit {

  @Input() showModal;
  @Output() newPlaylistCreated = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter();

  name = '';
  desc = '';
  icon = 'wolf';

  status = '';
  errorMsg = '';

  constructor(
    private musicService: MusicService,
    private playlistService: PlaylistService
  ) {
  }

  ngOnInit() {
  }

  newPlaylist() {
    if (this.name.length > 0) {
      this.playlistService.newPlaylist(this.name, this.desc, this.icon);
      this.newPlaylistCreated.emit(true);
      this.clearState();
    }
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

    if (this.name.length === 0) {

      this.status = 'error';
      this.errorMsg = 'Playlist name cannot be empty.';

    } else if (this.playlistService.playlistExists(this.name)) {
      this.status = 'error';
      this.errorMsg = 'Playlist name already exists.';
    } else {
      this.status = 'valid';
    }

  }

  closeModalWindow() {
    this.clearState();
    this.closeModal.emit();
  }

  clearState() {
    this.name = '';
    this.desc = '';
    this.icon = 'wolf';
    this.status = '';
  }

  setActiveImg(type) {
    this.icon = type;
  }

  setImgClass(type) {

    let classes = 'playlist-modal__img';
    if (type === this.icon) {
      classes += ' playlist-modal__img--active';
    }
    return classes;

  }

}
