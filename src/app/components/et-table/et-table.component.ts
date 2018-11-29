import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-et-table',
  templateUrl: './et-table.component.html',
  styleUrls: ['./et-table.component.scss']
})
export class EtTableComponent implements OnInit {

  @Input() items;
  filteredItems = [];
  sortColumns = [];
  @Input() columns;
  @Input() options;
  @Output() itemClicked = new EventEmitter<object>();
  @Input() playingTrack;
  innerWidth: number;
  sortType = 'trackPos';
  sortAscending = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor() {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.sortType =  this.columns[0]['name'];
    this.sortItems(this.columns[0]['name'], true, this.columns[0]['numeric']);

    for (let i = 0; i < this.filteredItems.length; i++) {
      this.sortColumns.push({
        'mouseHover': false,
        'sortingAsc': true,
      });
    }

  }

  setThClasses(column) {
    const classes = 'et-table__th';
    return classes;
  }

  sortItems(key, sortingAsc, numeric) {

    this.filteredItems = this.items.sort((a, b) => {
      return a[key].localeCompare(b[key], 'en', {numeric: numeric});
    }).slice();

    if (!sortingAsc) {
      this.filteredItems.reverse();
    }

  }

  setItemClasses(item) {

    let classes = 'et-table__item';

    if (this.playingTrack['id'] === item['id']) {
      classes += ' et-table__item--active';
    }

    return classes;
  }

  setTdClasses(column) {

    let classes = 'et-table__td';

    if (column['faded']) {
      classes += ' et-table__td--faded';
    }

    if (column['width'] === 'small') {
      classes += ' et-table__td--small';
    }

    return classes;
  }

  setColumnContent(item, column) {

    if (column['type'] === 'track') {
      return item[column['name']].split('/')[0];
    } else {
      return item[column['name']];
    }

  }

  manageSortClasses(name, index) {

    let classes = 'fas et-table__sort-icon';

    if (this.sortColumns[index]['mouseHover']) {

      if (this.sortAscending && name === this.sortType) {
        classes += ' fa-angle-up';
      } else {
        classes += ' fa-angle-down';
      }

    } else {

      if (this.sortAscending) {
        classes += ' fa-angle-down';
      } else {
        classes += ' fa-angle-up';
      }

    }

    if (name === this.sortType || this.sortColumns[index]['mouseHover']) {
      classes += ' et-table__sort-icon--visible';
    }

    return classes;
  }

  setSortType(name, index, numeric) {
    if (this.sortType !== name) {
      this.sortAscending = true;
    } else {
      this.sortAscending = !this.sortAscending;
    }
    this.sortType = name;
    this.sortItems(name, this.sortAscending, numeric);

  }

}
