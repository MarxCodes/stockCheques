import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../data.service';
import { StockDayPrice } from '../models/stock-day-price.model';
import { multi } from './data';
@Component({
  selector: 'app-line-charty',
  templateUrl: './line-charty.component.html',
  styleUrls: ['./line-charty.component.css']
})
export class LineChartyComponent implements OnInit {
  directedData = {

  }

  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  multi : any[];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  keys = ['ABCM', 'AAPL', 'ACCD', 'ACER'];
  newKey = [];
  constructor(private ds: DataService) {
    Object.assign(this, { multi })
   }

  ngOnInit(): void {
    for (var id of this.keys) {

      var thisIT = this.ds.getSumJson(id).subscribe(i => console.log)
      // this.newKey.push(this.ds.getSumJson(id).subscribe(i => console.log(`from sub ${id}:`, i)))
      this.newKey.push(thisIT);
      console.log(thisIT)

      // console.log(this.newKey);
      // Returns the last item as many times as length of arr
      // forkJoin(this.ds.getSumJson(id).subscribe(i => console.log(`from sub ${id}:`, i)))


      // forkJoin(this.ds.getSumJson(id).subscribe(/i => console.log('from sub:', i)))

      // this.newKey.push(this.ds.getSumJson(id))
    }
    console.log('newquays : ' + this.newKey);
    this.multi = JSON.parse(JSON.stringify(this.newKey))
    // forkJoin(this.newKey).subscribe(i => console.log(i))

    // forkJoin(this.newKey).pipe(
    //   tap(i => console.log(i))
    // ).subscribe(i => console.log(i))
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
