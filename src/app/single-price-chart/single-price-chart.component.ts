import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { bufferCount, map, take, tap } from 'rxjs/operators';
import { DataService } from '../data.service';
import { AlphaStock } from '../models/AlphaStock';

@Component({
  selector: 'app-single-price-chart',
  templateUrl: './single-price-chart.component.html',
  styleUrls: ['./single-price-chart.component.scss']
})
export class SinglePriceChartComponent implements OnInit, AfterContentInit {
  view: any[] = [1200, 800];
  @Input() inputData: Observable<AlphaStock[]>;
  @Input() months;
  stockData: Observable<[]>;
  // options

  legendPosition = 'below';
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = false;
  maxXScale = '100%';
  minXScale = '50em'
  maxYScale = '100%'
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  paramID = this.activeRoute.snapshot.params;
  stockTitle = this.paramID.name;
  stockTicker = this.paramID.id;
  alphaMonthData:Observable<AlphaStock[]> = this.dataService.alphaDataByMonth(this.paramID.id, this.paramID.name).pipe(
      map(buoys => buoys.map((val, index) => ({name: index, value: +val.close})).slice(0,this.months)),
      map(series => ([{name: this.stockTicker, series}])),
      tap(console.log)
    )
  // this.alphaMonthData.pipe(
  //   map(buoys => buoys.map((val, index) => ({name: index, value: +val.close})).slice(0,5)),
  //   map(series => ([{name: 'proj', series}])),
  //   tap(console.log)
  // )
  constructor(private activeRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
      // map(e => e.map((hi,i) => ({ value: hi.close, name: i}))),take(4)).subscribe(console.log)
    // console.log(typeof this.inputData)

    // this.stockData = this.inputData.S
  }


  ngAfterContentInit() {
    // console.log(this.inputData.subscribe(el => console.log('the sub: ', el)))
    // this.inputData.pipe(map(mate => mate.map((val,months) => {if (months < 6) {this.stockData.(val)}}))).subscribe()

    // map((a,i) => { if(i < this.months) this.multi.push(a)}  )
    // console.log('the multi: ', this.multi);

  }
}
