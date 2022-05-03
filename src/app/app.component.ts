import { Component, OnInit, TemplateRef, AfterContentChecked, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import * as beta from './components/detail/drop_down';
// import  data  from "./arrayFun.json";
import * as data from './arrayFun.json';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';
import {PracticeControllerService} from './services/practice-controller.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked{
  // beta = ['a','b','c'];
  cult: any = (beta as any).default;
  @ViewChild('child', { static: true}) child;
  buttonDisabled: boolean = true;
  arrLen: number = 0;
  control = new FormControl();
  showFiller = false;
  clickedEls = [];
  arr = [];
  data;
  showchartz: boolean = false;
  a$;
  b$;
  c$;
  d$;
  registerData = {
    email: 'me@email.com',
    password: 'password'
  }
  alphaUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=60min&slice=year2month12&apikey=VG2FOU0O6XNVE1F6';
  alphaUrlBase = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=60min&';
  alphaKEY = '&apikey=VG2FOU0O6XNVE1F6';
  showPanel = false;
  // jobData = this.http.post('http://localhost:3000/api/v1/auth/register', this.registerData).subscribe(el => console.log(el))
  // newOB$ = of(this.products).pipe(
  //   take(2)
  // )
  // showCharts;

  constructor(private ds: DataService,
    private cs: PracticeControllerService,
    private http: HttpClient ){
      this.ds.toggle.subscribe(val => this.showPanel = val);
      // console.log(this.newOB$);
  }

  toggleShowPanel() {
    if(this.showPanel === true) {
      this.ds.toggle.emit(false);
    }
    else if(this.showPanel === false) {

      this.ds.toggle.emit(true);
    }
    // console.log(this.ds.toggle.subscribe(val => ))
    // this.ds.toggle.emit(!this.ds.);
    // if(this.ds.toggle.subscribe(data => {
    //   data
    // }))
    // this.ds.toggle.subscribe(data => {
    //   this.showPanel = !this.showPanel
    // })
  }

  toggleSearch() {
    this.ds.toggle.subscribe(status => this.showPanel = status)
    console.log('from app: ', this.ds.toggle);
  }

  timeSpan = {
    // today: 'intraday',
    month: {m: 2, y:2},
    sixMonth: {m: 7, y:2},
    year: {m: 13, y:2},
    twoYr: {y:3, m:13}
  }
  pap = ['slice=year1month1','slice=year1month2','slice=year1month3']
  // @Output() showCharts: EventEmitter<boolean> = new EventEmitter(false);

  getAlphaHistory() {
    let months = this.timeSpan['year'].m;
    let years = this.timeSpan['year'].y;
    // let arr = [];
    for(let i = 1; i < years; i++) {
      for(let j = 1; j < months; j++) {
        //  return arr.push(this.alphaUrlBase + `slice=year${i}month${j}` + this.alphaKEY)
          // console.log(i, j)
          this.arr.push(`slice=year${i}month${j}`)
        }
      }
      return this.arr;
      // return this.arr.map(el => this.getMeAlphaBaby(this.alphaUrlBase + el + this.alphaKEY).pipe(tap(console.log)));
    // return arr.map(el => {return this.getMeAlphaBaby(el)})
  }
        ngOnInit() {
          // this.ds.getAlphaStock().subscribe(el => console.log('here?', el))

          // this.ds.getAlphaHistory();
          // forkJoin(this.pap.map(el => this.ds.getMeAlphaBaby(this.alphaUrlBase + el + this.alphaKEY).subscribe(res => console.log(res[1]))))

          // this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year2month12&apikey=VG2FOU0O6XNVE1F6').subscribe(console.log)
          //   let data = {
          //     Symbol: 'MRO'
          //   }
          //   this.ds.getSlimy(data).subscribe(console.log)
          // console.log(this.showchartz);
          // this.cs.showChart.subscribe(load => this.showChart = load)
          // this.showCharts = this.cs.showCharts;

          //   console.log(this.cs.showCharts)
        }

        ngAfterContentChecked(){
          this.showchartz = this.ds.showCharts;

        }

        selectChange(event) {
          console.log(event.target.value)
        }

  createCorrecVariableCount(){
    this.clickedEls.map((el,i) => {
      // let `num${i}` = el.Symbol
    })
  }

  iterateIt() {


    let boob, tit, arse, shit;

    let mappedEls = this.clickedEls.map(i => i.Symbol);
    [boob, tit, arse, shit] = mappedEls;
    this.a$ = this.ds.getSumJson(boob);
    this.b$ = this.ds.getSumJson(tit);
    this.c$ = this.ds.getSumJson(arse);
    this.d$ = this.ds.getSumJson(shit);

    // forkJoin([th])
  }

  lengthOfArrayFull(){
    if (this.clickedEls.length === 3) {
      this.buttonDisabled = false;
      return true;
    }
    return false;
  }

  // passMyData(e, u) {
  //   console.log('eveent: ', e, 'option?: ', u);
  //   if (this.clickedEls.length > 3) {
  //     return this.popUp();
  //   }

  //   !this.lengthOfArrayFull() ? this.clickedEls.push(u) : this.popUp();

  //   console.log('els: ', this.clickedEls)
  // }


  // popUp() {
  //   alert('already added 4 stocks');

  // }
  // deleteItem(e,i){
  //   this.clickedEls.splice(i, 1);
  // }
}
