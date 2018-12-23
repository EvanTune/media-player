import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() items;
  @Input() showDropdown;
  @Input() topOffset;
  @Input() leftOffset;

  @Output() closeDropdown = new EventEmitter<boolean>();
  @Output() menuClickedEvent = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {

    for (let i = 0; i < this.items.length; i++) {
      this.items[i]['hover'] = false;
    }

  }

  menuClicked(e, item) {
    if (item['clickable']) {
      this.menuClickedEvent.emit(item);
    }
  }

}
