import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { AlphaStock } from 'src/app/models/AlphaStock';
import * as beta from './drop_down';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  cult: any = (beta as any).default;
  detailedIterables;
  betaService;
  mySubscription: any;

  // title = this.
  paramID = this.activeRoute.snapshot.params;
  stockTitle = this.paramID.name;
  stockTicker = this.paramID.id;
  // alphaMonthData:Observable<AlphaStock[]> = this.dataService.alphaDataByMonth(this.paramID.id, this.paramID.name)
  tableData = this.dataService.getTimeSeries(this.paramID.id)

  constructor(private dataService: DataService, private activeRoute: ActivatedRoute, private router: Router) {
    this.betaService = this.dataService.detailArray;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
   }

  ngOnInit(): void {
    // console.log(this.activeRoute.snapshot.params)

    let paramID = this.activeRoute.snapshot.params
    this.activeRoute.params.subscribe(el => {
      let id = el['id'];
      console.log(id)
    })
    // .subscribe(data => console.log(data))

    // .subscribe((params: Params) => {
    //   let id = params['id'];
    //   console.log(id);
    // })

  }

  selectChange(event) {
    console.log(event.target.value)
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
