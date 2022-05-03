import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab-contents',
  templateUrl: './tab-contents.component.html',
  styleUrls: ['./tab-contents.component.scss']
})
export class TabContentsComponent implements OnInit {
  @Input() month: number;
  @Input() years: number;
  @Input() dataArr : [{name,Symbol}];
  arr = [];
  finishedArr = [];
  displayData = [];
  monthlyChange;
  annualChange;
  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.displayData = this.dataArr.map(i => this.data.alphaMonthlyTyped(i.Symbol, i.name).subscribe(data => {
      this.data.retrievedData[i.name] = data;
      this.finishedArr.push(data[data.length - 1])
    }))
    this.calculateDatas();
    // console.log(this.data.stockData.pipe(map(el => console.log(el)) ).subscribe(console.log), 66)
    // this.data.getMonthyData('Chile').subscribe(eek => console.log(eek))

  }

  calculateDatas() {
    for(let i = 1; i < this.years; i++) {
      for(let j = 1; j < this.month; j++) {
          this.arr.push(`slice=year${i}month${j}`)
        }
      }
  }

}
