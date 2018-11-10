import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss']
})
export class TrackInfoComponent implements OnInit {

  jsmediatags = require('jsmediatags');
  src = '';
  title = '';
  artist = '';

  constructor() {
  }

  ngOnInit() {
    this.jsmediatags.read('C:/Users/Oyvind/Downloads/music/Captive_Portal_-_01_-_You_Can_Use.mp3', {
      onSuccess: (tag) => {
        //console.log(tag);

        const tags = tag.tags;
        const image = tags.picture;

        this.title = tags.title;
        this.artist = tags.artist;

        if (image) {
          let base64String = '';
          for (let i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
          }
          //this.src = 'data:image/jpeg;base64,' + window.btoa(base64String);

        } else {

        }

      },
      onError: function (error) {
        console.log(':(', error.type, error.info);
      }
    });
  }

}
