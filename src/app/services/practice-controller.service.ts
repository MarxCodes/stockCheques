import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeControllerService {
  selectedArr = [];
  showCharts : boolean = false;
  // private showChartSource: any = new BehaviorSubject<any>({});
  // public showChart = this.showChartSource.asObervable();

  constructor() { }

  // setChart(showChart) {
  //   this.showChartSource.next(showChart);
  // }
  add(val) {
    this.selectedArr.push(val);
    console.log(this.selectedArr);
  }

  deleteItem(i, fn) {
    this.selectedArr.splice(i, 1);
    if (this.selectedArr.length === 0) {
      fn();
    }
    console.log(this.selectedArr);
  }

  search() {
    // this.selectedArr = [];
    this.showCharts = !this.showCharts;
    console.log(this.showCharts)
  }
}
