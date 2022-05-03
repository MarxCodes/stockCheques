import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail-line-chart',
  templateUrl: './detail-line-chart.component.html',
  styleUrls: ['./detail-line-chart.component.scss']
})
export class DetailLineChartComponent implements OnInit {
  view: any[] ;

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  detailed = [];

  constructor(private ds: DataService) {
    // this.ds.getSlimy('aapl')
  }

  ngOnInit(): void {
  }

}
