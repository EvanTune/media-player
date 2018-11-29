import {Component, OnInit} from '@angular/core';
import {StateService} from '../../../services/state.service';
import {remote} from 'electron';
import {readdirSync, statSync, existsSync} from 'fs';
import * as path from 'path';
import {FileReaderService} from '../../../services/file-reader.service';
import {MusicService} from '../../../services/music.service';

@Component({
  selector: 'app-music-folders',
  templateUrl: './music-folders.component.html',
  styleUrls: ['./music-folders.component.scss']
})
export class MusicFoldersComponent implements OnInit {

  musicFolders = [];
  showProgress = false;

  constructor(
    private musicService: MusicService,
    private fileReaderService: FileReaderService
  ) {
  }


  ngOnInit() {
    this.musicFolders = this.musicService.getMusicFolders();
  }

  scanAudioFiles() {

    this.showProgress = true;

    this.musicFolders.forEach((folderPath) => {
      this.fileReaderService.getAllSubFolders(folderPath);
    });

    const allFolders = this.fileReaderService.getSubFolders().concat(this.musicFolders);
    const paths = this.fileReaderService.getAllFilesFromFolders(allFolders, ['mp3']);

    this.fileReaderService.processAudioFiles(paths, () => {
      this.musicService.setMusic(this.fileReaderService.fileList);
      this.showProgress = false;
    });
  }



  addFolders() {
    remote.dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']}, (folderPaths) => {
      this.musicService.addMusicFolders(folderPaths);
      this.musicFolders = this.musicService.getMusicFolders();
    });
  }


  removeFolder(index) {
    this.musicService.removeMusicFolder(index);
    this.musicFolders = this.musicService.getMusicFolders();
  }

  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

}
