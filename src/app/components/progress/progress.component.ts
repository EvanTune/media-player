import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() progressInfo;
  dots = '';

  constructor() { }

  ngOnInit() {
    this.addDots();
  }

  addDots() {
    setInterval(() => {
      if (this.dots.length < 3) {
        this.dots += '.';
      } else {
        this.dots = '';
      }
    }, 450);
  }

}
