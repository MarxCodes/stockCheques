import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice-console',
  templateUrl: './practice-console.component.html',
  styleUrls: ['./practice-console.component.css']
})
export class PracticeConsoleComponent implements OnInit {

  selectedArray = [];
  containerFull = false;
  view: string = 'small';
  big = 'big';
  small = 'small';

  constructor() { }

  ngOnInit(): void {
  }

  //check value of radio button control
  // let view = view ? 'checl' : 'uncheck'
  checkRadioInputVal() {

  }

  // add function

  add(el) {
    if(this.selectedArray.length < 3) {
      this.selectedArray.push(el);
      this.toggleContainerLength();
    }
    this.containerFull = true;

  }

  delete(el) {

    this.selectedArray.splice(el, 1);
    if(this.selectedArray.length === 0) {
      this.containerFull = false;
      this.toggleContainerLength()
    }
  }

  toggleContainerLength() {
    this.view = this.view === 'big' ? 'small' : 'big';
  }


}
