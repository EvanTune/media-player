import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  showVideoPlayer: boolean;
  type = 'videos';
  videos = [{
    'title': 'Test video 1',
    'time': '5:31'
  }];

  constructor() { }

  ngOnInit() {
  }

}
