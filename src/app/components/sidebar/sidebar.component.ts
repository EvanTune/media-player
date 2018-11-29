import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() type;
  @Output() sidebarChanged = new EventEmitter<boolean>();
  musicActive = true;
  videosActive = false;
  settingsActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setActiveClass();
        console.log(route.url);
      }
    });
  }

  ngOnInit() {
    console.log(this.router.url);
  }

  setActiveClass() {
    this.musicActive = this.router.url.startsWith('/music');
    this.videosActive = this.router.url.startsWith('/videos');
    this.settingsActive = this.router.url.startsWith('/settings');
  }

  goBack() {
    this.location.back();
  }



}
