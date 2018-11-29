import { Component, OnInit } from '@angular/core';
import {ElectronService} from '../../providers/electron.service';
import {Router} from '@angular/router';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  showList = false;

  constructor(
    private electronicService: ElectronService,
    private router: Router,
    public stateService: StateService
  ) { }

  ngOnInit() {


  }

  closeWindow() {
    this.electronicService.window.close();
  }

  minimizeWindow() {
    this.electronicService.window.minimize();
  }

  maximizeWindow() {
    this.electronicService.window.maximize();
  }

  setActiveClass(name) {
    if (this.router.url === name) {
      return 'top-menu__item top-menu__item--active';
    } else {
      return 'top-menu__item';
    }
  }


}
