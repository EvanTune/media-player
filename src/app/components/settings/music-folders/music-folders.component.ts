import {Component, Input, NgZone, OnInit} from '@angular/core';
import {remote} from 'electron';
import {FileReaderService} from '../../../services/file-reader.service';
import {MusicService} from '../../../services/music.service';
import {Router} from '@angular/router';
import {PlaybackService} from '../../../services/playback.service';

@Component({
  selector: 'app-music-folders',
  templateUrl: './music-folders.component.html',
  styleUrls: ['./music-folders.component.scss']
})
export class MusicFoldersComponent implements OnInit {

  folders = [];
  showProgress = false;
  progressInfo = {percent: '0%'};
  foldersSelected = [];
  @Input() folderType;


  constructor(
    private musicService: MusicService,
    private playbackService: PlaybackService,
    private fileReaderService: FileReaderService,
    private router: Router,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.folders = this.musicService.getFolders(this.folderType);
    this.transformMusicFolders();
  }

  transformMusicFolders() {

    for (let i = 0; i < this.folders.length; i++) {
      this.folders[i] = {
        'folderPath': this.folders[i],
        'checked': false
      };
    }

  }

  scanAudioFiles(folderPaths) {

    const allFolders = this.fileReaderService.getAllFolders(folderPaths);
    const allFilePaths = this.fileReaderService.getAllFilesFromFolders(allFolders, ['mp3']);

    if (allFilePaths.length === 0) {

      setTimeout(() => {

        this.progressInfo['percent'] = '100%';

        setTimeout(() => {
          this.showProgress = false;
          this.progressInfo['percent'] = '0%';
        }, 1000);

      }, 2000);

    } else {

      setTimeout(() => {
        this.progressInfo['percent'] = '50%';

        setTimeout(() => {

          // Process files and return callback when done
          this.fileReaderService.processAudioFiles(allFilePaths, (newMedia) => {

            this.musicService.appendMusic(newMedia);

            this.playbackService.setPlayingTrack({});
            this.playbackService.clearMusicQueue();

            this.router.navigate(['/music/songs']);

            this.progressInfo['percent'] = '100%';
            setTimeout(() => {
              this.showProgress = false;
              this.progressInfo['percent'] = '0%';
            }, 1000);

          });

        }, 1000);

      }, 1000);

    }

  }

  openFoldersDialog() {

    // Open dialog box to select folders
    remote.dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']}, (folderPaths) => {

      if (folderPaths.length > 0) {
        // Make sure callback is run within zone
        this.ngZone.run(() => {

          this.showProgress = true;
          this.progressInfo['status'] = 'started';

          // Add new folders to store
          this.musicService.addFolders(folderPaths, this.folderType);

          // Get the updated folders
          this.folders = this.musicService.getFolders(this.folderType);
          this.transformMusicFolders();

          // Scan the new folders for music
          this.scanAudioFiles(folderPaths);

        });
      }

    });
  }

  removeFolders() {

    // Removes the folders users selected from store
    this.musicService.removeFolders(this.foldersSelected, this.folderType);

    // Get the updated folders
    this.folders = this.musicService.getFolders(this.folderType);
    this.transformMusicFolders();

    this.foldersSelected = [];
    this.playbackService.setPlayingTrack({});
    this.playbackService.clearMusicQueue();
  }

  // Checks array of objects for unique property name
  unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
  }

  // Checks and un checks folders
  folderItemClicked(folder, index) {
    this.folders[index]['checked'] = !this.folders[index]['checked'];
    if (this.folders[index]['checked']) {
      this.foldersSelected.push(folder);
    } else {
      for (let i = 0; i < this.folders.length; i++) {
        if (this.foldersSelected[i] === folder) {
          this.foldersSelected.splice(i, 1);
        }
      }
    }
  }

}
