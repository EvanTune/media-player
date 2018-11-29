import { Component, OnInit } from '@angular/core';
import {StateService} from '../../../services/state.service';

@Component({
  selector: 'app-color-theme',
  templateUrl: './color-theme.component.html',
  styleUrls: ['./color-theme.component.scss']
})
export class ColorThemeComponent implements OnInit {

  theme = 'theme-dark';

  constructor(
    private state: StateService
  ) { }

  ngOnInit() {
    this.theme = this.state.getTheme();
    console.log(this.theme);
  }

  setTheme(newTheme) {
    this.state.setTheme(newTheme);
    this.theme = newTheme
  }

  setClasses(theme) {

    let classes = 'color-theme__item';

    if (theme === this.theme) {
      classes += ' color-theme__item--active';
    }

    if (theme === 'theme-dark') {
      classes += ' color-theme__item--theme-dark';
    } else {
      classes += ' color-theme__item--theme-light';
    }

    return classes;

  }

}
