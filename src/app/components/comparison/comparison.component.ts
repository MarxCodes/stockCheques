import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
  barr = this.ds.barr;
  showchartz;
  constructor(private ds: DataService) {
    // this.ds.getFinalArrItems()
   }

  ngOnInit(): void {
  }
  ngAfterContentChecked(){
    this.showchartz = this.ds.showCharts;

  }
}
