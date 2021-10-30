import { Component, TemplateRef } from '@angular/core';
import { DataService } from './data.service';
import { FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';
// import  data  from "./arrayFun.json";
import * as data from './arrayFun.json';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  buttonDisabled: boolean = true;
  arrLen: number = 0;
  control = new FormControl();
  showFiller = false;
  clickedEls = [];
  data;

  a$;
  b$;
  c$;
  d$;
  // newOB$ = of(this.products).pipe(
  //   take(2)
  // )


  constructor(private ds: DataService){

      // console.log(this.newOB$);
    // this.ds.getBTime().subscribe(i => console.log('getBTime: ', i));
    // this.ds.getBIntraDay()
    // // .pipe(map(o => this.change = o.change))
    // .subscribe(i => {
    //   // let keys = Object.keys(i);
    //   console.log('keys: ', i)

    // }
    // );

    // this.ds.getTimeSeries().subscribe(i => console.log('getTimeSeries: ', i));

    // this.ds.getFundamentals().subscribe(i => console.log('getFundamentals: ', i));
    // this.ds.getSumJson().subscribe(i => console.log('getSumJson: ', i));
    // this.ds.getIncomeStatement().subscribe(i => console.log('getIncomeStatement: ', i));


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
