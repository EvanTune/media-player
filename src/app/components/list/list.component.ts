import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() type;
  @Input() items;
  @Output() showVideoPlayer = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
