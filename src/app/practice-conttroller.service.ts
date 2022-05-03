import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PracticeConttrollerService {
  selectedArr = [];
  constructor() { }

  add(val) {
    this.selectedArr.push(val);
  }
}
