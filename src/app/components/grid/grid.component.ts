import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() items;
  @Input() type;
  @Output() openVideo = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
