import {Injectable} from '@angular/core';
import * as fs from 'fs';
import {MusicService} from './music.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private musicService: MusicService
  ) {
  }

  decodeBase64Image(dataString) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response['type'] = matches[1];
    response['data'] = Buffer.from(matches[2], 'base64');

    return response;
  }

  saveImageBufferToDisc(imageBuffer, fileName, path, rllo) {

      this.checkIfFileExists(path + fileName, (err) => {
        if (err) {
          fs.writeFile(path + fileName, imageBuffer.data, (err) => {
            rllo();
          });
        } else {
        }
      });

  }

  checkIfFileExists(path, callback) {
    fs.access(path, fs.constants.F_OK, (err) => {
      callback(err);
    });
  }

  addAlbumCovers() {

    const albums = this.musicService.getAlbums();
    for (let i = 0; i < albums.length; i++) {

      const ImgBuffer = this.decodeBase64Image(albums[i]['image']);
      this.saveImageBufferToDisc(ImgBuffer, albums[i]['album'].split(' ').join('-') + '.png', './src/assets/img/albums/', (err) => {

      });

    }

  }

}
