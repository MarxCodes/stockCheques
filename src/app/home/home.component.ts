import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../data.service';
interface Bock {
  name: string,
  minute: string,
  average:number,
  value: number
  nameTing: string,
  high: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.scss']
  styleUrls: ['./home-1.component.scss']


})
export class HomeComponent implements OnInit {
  articleList = [
    {time:'2022-05-03T15:58:30.000Z' , headline: 'European Stocks Bounce After Flash Crash as Traders Eye Policy'},
    {time:'2022-05-03T08:52:25.000Z', headline: 'China Tech Stocks Fall as Policy Jitters Outweigh Support Vows' },
    {time: '5/2/2022', headline: 'Dip Buyers Save the Day as Stocks Finish Higher: Markets Wrap'},
    { time: '5/2/2022', headline: 'Apartment Owner Breaks the Ice on Canada’s Frozen IPO Market'}
  ]
  bigBoy = [
    {Name: 'Amazon.com Inc.', Symbol: 'AMZN'},
    {Name: 'Google', Symbol: 'GOOG'},
    {Name: 'Tesla', Symbol: 'TSLA'},
  ];
  bigBoy2 = [
    // {Name: "O'Reilly Automotive", Symbol: 'ORLY'},
    {Name: 'Adobe', Symbol: 'ADBE'},
    {Name: 'Netflix', Symbol: 'NFLX'}
  ];

  gainers2 = [
    {Name: 'Match Group', Symbol: 'MTCH'},
    {Name: 'Tapestry', Symbol: 'TPR'},
    {Name: 'Caesars Entertainment', Symbol: 'CZR'},
  ];
  gainers = [
    {Name: 'Moderna', Symbol: 'MRNA'},
    // {Name: 'Carnival Corp', Symbol: 'CCL'},
    {Name: 'United AirLines', Symbol: 'UAL'}
  ]

  losers = [
    {Name: 'Phillips', Symbol: 'PSX'},
    {Name: 'Exxon Mobil', Symbol: 'XOM'},
    // {Name: 'Schlumberger NV', Symbol: 'SLB'},
  ];
  losers2 = [
    {Name: 'Valery Energy', Symbol: 'VLO'},
    {Name: 'EOG Resources', Symbol: 'EOG'},
    {Name: 'Marathon Oil Corp', Symbol: 'MRO'}
  ]

  bigBoyResult = [];
  eventual = []


  bigBoyTemp = [];
  bigBoyTemporary = [];

  bigBoy2Temp = [];
  bigBoy2Temporary = [];


  gainersTemp = [];
  gainersTemporary = [];

  gainers2Temp = [];
  gainers2Temporary = [];


  losersTemp = [];
  losersTemporary = [];

  losers2Temp = [];
  losers2Temporary = [];

  finalBigBoys = [];
  finalGainers = [];
  finalLosers = [];
  // bigBoss = [];

  constructor(private data: DataService) { }

   ngOnInit() {
    //  this.sortArray(this.gainers, this.gainersTemp, this.gainersTemporary)
    //  this.sortArray(this.gainers2, this.gainers2Temp, this.gainers2Temporary)
     // this.sortArray(this.losers, this.losersTemp, this.losersTemporary)
     // this.sortArray(this.losers2, this.losers2Temp, this.losers2Temporary)


    //  this.sortArray(this.bigBoy, this.bigBoyTemp, this.bigBoyTemporary, this.finalBigBoys)

  //   setTimeout(() => {
  //     this.sortArray(this.bigBoy2, this.bigBoy2Temp, this.bigBoy2Temporary, this.finalBigBoys)
  //   }, 800);
  this.sortArray(this.gainers, this.gainersTemp, this.gainersTemporary, this.finalGainers)
    // setTimeout(() => {
    // }, 1600);
  //   setTimeout(() => {
  //   this.sortArray(this.gainers2, this.gainers2Temp, this.gainers2Temporary, this.finalGainers)
  // }, 2400);
  setTimeout(() => {
    this.sortArray(this.losers, this.losersTemp, this.losersTemporary, this.finalLosers)
    }, 1000);
  //   setTimeout(() => {
  //     this.sortArray(this.losers2, this.losers2Temp, this.losers2Temporary, this.finalLosers)
  //   }, 4000);
  }

  sortArray(data,temp, temporary, final) {
    // this.bigBoy.map(i => {
    //   this.tempArr.push(this.data.getSlimy(i).pipe(map(el => {
    //     this.tempererArr.push(this.data.formatJSON(i,el))
    //   })))
    // })

    for(let i = 0; i < data.length; i++) {
      temp.push(this.data.getSlimy(data[i])
      .pipe(
        map(el => {
        temporary.push(this.data.formatJSON(data[i],el))
      })
      ))
    }
    forkJoin(temp).subscribe(elem => {
      // this.data.getBinalArrItems()
      this.getFinalArrayed(temporary, final);
    })
  }

  getFinalArrayed(temporary, final) {
     let finalCounter;
     return [...temporary].forEach(o => {
      //  console.log('o series:', o.series)
       let first = o.series[0].value
       let last = o.series[o.series.length - 1].value;
       finalCounter = o.series[o.series.length - 1];
       let benign = {
         ...finalCounter,
         first,
         last
        }
       final.push(benign);
     })
   }

}
