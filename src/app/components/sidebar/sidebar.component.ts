import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() type;
  @Output() sidebarChanged = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.router.url);
  }

  setActiveClass(name) {
    if (this.type === name) {
      return 'sidebar__item sidebar__item--active';
    } else {
      return 'sidebar__item';
    }
  }

  setType(type) {
    this.sidebarChanged.emit(type);
  }



}
