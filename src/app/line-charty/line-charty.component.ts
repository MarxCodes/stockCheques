import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { concatAll, map, tap, toArray } from 'rxjs/operators';
import { DataService } from '../data.service';
import { StockDayPrice } from '../models/stock-day-price.model';
import { culty } from './data';
import { PracticeControllerService } from '../services/practice-controller.service';
import { AlphaStock } from '../models/AlphaStock';
@Component({
  selector: 'app-line-charty',
  templateUrl: './line-charty.component.html',
  styleUrls: ['./line-charty.component.scss']
})
export class LineChartyComponent implements OnInit,OnDestroy {
  directedData = {

  }

  view: any[] ;

  // options
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
  multi = [];
  balty = []
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  arred = []
  barr = [];
  windowWeedth : number;
  hideMap = this.multi.length > 0 ? true : false;
  // selectedStocks = forkJoin(this.ds.selectedComparisonArray.map(item => {
  //   return this.ds.alphaDataByMonth(item.Symbol, item.Name).pipe(
  //     map(elems => elems.map((val, index) => ({name: index, value: +val.close})).slice(0,12)),
  //     map(series => ([{name: item.Symbol,series }])),
  //     // tap(callMe => console.log('meTHO: ',callMe))
  //   )
  // })).subscribe(canIt => console.log('canIT? :', canIt))
  selectedMeStocks = this.ds.selectedComparisonArray.map(item => {
   return this.ds.alphaDataByMonth(item.Symbol, item.Name).pipe(
      map(elems => elems.map((val, index) => ({name: index, value: +val.close})).slice(0,12)),
      map(series => ({name: item.Symbol,series })),
    )
  })

  forked = forkJoin(this.selectedMeStocks)
  // meme = of(...this.selectedMeStocks).pipe(toArray()).subscribe(response => console.log('res :',response))
  // meActualStocks = forkJoin([...this.selectedMeStocks]).subscribe(no => console.log('no :', no))

  // selectedARRAY : Observable<[]>;
  // selectedChoices = this.ds.selectedComparisonArray;
  // alphaData : Observable<AlphaStock[]> = this.ds.alphaDataByMonth(this.ds.selectedComparisonArray.)
  constructor(private ds: DataService,
              private cs: PracticeControllerService) {
                // this.multi = this.ds.multi$;
                // console.log('on linechart init: ', this.multi);
                // this.getFinalArrItems();
                // this.windowWeedth = (window.innerWidth * .5);
                // console.log(this.windowWeedth)
                // this.view = [this.windowWeedth, 500]
   }


   getFinalArrItems() {
    console.log(this.ds.multi$, "multeee")
     let finalCounter;
     return [...this.multi].forEach(o => {
       console.log('o series:', o.series)
       let first = o.series[0].value
       let last = o.series[o.series.length - 1].value;
       finalCounter = o.series[o.series.length - 1];
       let benign = {
         ...finalCounter,
         first,
         last
        }

       this.barr.push(benign);
     })

   }


   multiStock() {
   }



  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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
