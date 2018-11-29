import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss']
})
export class TrackInfoComponent implements OnInit {

  jsmediatags = require('jsmediatags');
  @Input() trackInfo;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {

  }

  sanitizeUrl(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }


}
