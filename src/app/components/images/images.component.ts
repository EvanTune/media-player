import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  type = 'images';
  music = [{
    'title': 'Test music 1',
    'time': '3:53'
  }];

  constructor() { }

  ngOnInit() {
  }

}
