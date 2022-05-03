import {
  Component,
  ElementRef,
  OnInit,
  Query,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  Output,
  Renderer2,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import * as data from '../arrayFun.json';
import { DataService } from '../data.service';
import { PracticeControllerService } from '../services/practice-controller.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-console-w-service',
  templateUrl: './console-w-service.component.html',
  styleUrls: ['./console-w-service.component.scss'],
  animations: [trigger('zoom', [
    state('normal', style({
      backgroundColor: 'white',
      transform: 'scale(1.1)'
    })),
    state('zoom', style({
      backgroundColor: 'black',
      transform: 'scale(3)'
    })),
    transition('normal <=> zoom', animate(300))
  ]),]
})
export class ConsoleWServiceComponent implements OnInit {
  @ViewChild('containerRef', { static: true }) containerRef: ElementRef;
  @ViewChild('btnContainer', { static: true }) btnSearchContainer: ElementRef;
  @ViewChildren('btnContainer')
  btnContainerChildren: QueryList<ElementRef>;
  // @ViewChild('searchBtn', { static: true}) searchBtn: ElementRef;
  @ViewChild('addBtn', { static: true}) addBtn: ElementRef;
  @ViewChild('searchBtn', { static: true}) searchBtn: ElementRef;

  // @ViewChild('[data-flip]', { static: true }) dataflip: ElementRef;
  detailArray = [];
  products: any = (data as any).default;

  form = new FormGroup({
    sizable: new FormControl('detailed'),
  });
  control = new FormControl();
  detailed = 'detailed';
  comparison = 'comparison';
  btnView = 'detailed';
  tempArr = [];
  multi$ = [];
  // selectedArr = [];
  condition = false;
  bondi : boolean = false;
  @ViewChild('enlargeAnimation', { static: true}) enlargeAnimation : ElementRef;
  enlarge = 'enlarge';
  shrink = 'shrink';
  containerView = 'shrink';
  selectedArr = this.dataService.selectedComparisonArray;
  state: string = 'normal';
  ViewChild
  constructor(private cs: PracticeControllerService,
              private dataService: DataService,
              private router: Router,
              private _observer: BreakpointObserver,
              private renderer: Renderer2 ) {}

  mouseEvent(event, i){
      console.log(event.path, i)
      // event.path[0].
      this.state = event.type === 'mouseenter' ? 'zoom' : 'normal';
      this.renderer.setStyle(event.path[0].children[0], 'backgroundColor', '#f1f2f6')
      // this.renderer.addClass(event.path[0].children[0], 'hover-mouse')

    }
    mouseLeave(event, i) {
      console.log(event.path[0].children[0]);
      this.renderer.removeStyle(event.path[0].children[0], 'backgroundColor')

    }

   ngOnInit(): void {
     let ding = []
       this._observer.observe('(max-width:700px)').subscribe(
         result => {
           if(result.breakpoints["(max-width:700px)"] === true){
             console.log('trued')
             this.addBtn.nativeElement.textContent = "+";
             this.searchBtn.nativeElement.textContent = ">";
           }
          //  if(result.breakpoints === true){

          //  }

         }
       )
      //  this.dataService.getTimeSeries().subscribe(el => console.log('intraday: ', el))


      // this.dataService.getFundamentals().subscribe(el => console.log('intraday: ', el))

   }
  fn() {}

  search() {
    // this.cs.showCharts = !this.cs.showCharts;
    // console.log(this.cs.showCharts);
    // console.log('clicked');
    // this.cs.setChart(true)
    }

  toggleView() {
    this.btnView = this.btnView === 'detailed' ? 'comparison' : 'detailed';
    this.btnSearchContainer.nativeElement.dataset.view = this.btnView;
  }

  Dasflip(toggleState, firstEl, getLastEl = () => firstEl) {
    const firstRect = this.getRect(firstEl);

    requestAnimationFrame(() => {
      this.toggleView();

      let lastEl = getLastEl();
      const lastRect = this.getRect(lastEl);

      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;

      console.log({ dx, dy, dw, dh });

      lastEl.dataset.flipping = true;

      lastEl.style.setProperty('--dx', dx);
      lastEl.style.setProperty('--dy', dy);
      lastEl.style.setProperty('--dw', dw);
      lastEl.style.setProperty('--dh', dh);

      requestAnimationFrame(() => {
        delete lastEl.dataset.flipping;
      });
    });
  }

  containerFLIP(toggleState, firstEl, getLastEl = () => firstEl) {
    const firstRect = this.getRect(firstEl);

    requestAnimationFrame(() => {

      let lastEl = getLastEl();
      const lastRect = this.getRect(lastEl);

      const bx = String(lastRect.x - firstRect.x);
      const by = String(lastRect.y - firstRect.y);
      const bw = String(lastRect.width / firstRect.width);
      const bh = String(lastRect.height / firstRect.height);

      lastEl.dataset.enlarging = true;

      lastEl.style.setProperty('--bx', bx);
      lastEl.style.setProperty('--by', by);
      lastEl.style.setProperty('--bw', bw);
      lastEl.style.setProperty('--bh', bh);

      requestAnimationFrame(() => {
        delete lastEl.dataset.enlarging;
      });
    });
  }

  getRect(el) {
    return el.getBoundingClientRect();
  }

  toggleDataView(el) {
    this.Dasflip(this.toggleView, this.searchBtn.nativeElement);
  }

  enlargeContainer() {
    this.containerView = 'enlarge';
    this.enlargeAnimation.nativeElement.dataset.state = this.containerView;
  }

  shrinkContainer() {
    this.containerView = 'shrink';
    this.enlargeAnimation.nativeElement.dataset.state = this.containerView;
    console.log('shrinkContainer: ',this.containerView)
  }

  add(el) {
    console.log(this.dataService.selectedComparisonArray, this.bondi);
    //check search input is emplty
    if(this.control.value === null || this.control.value === undefined){
      return;
    }
    //limited to 3 stocks for a given search
     if (this.dataService.selectedComparisonArray.length >= 3) {
       return this.popUp();
    }
    //
    if (this.bondi === false) {
      el.dataset.prevState = this.containerView;
      console.log('tis called')
      // console.log('from add: ', this.containerFLIP);
      this.containerFLIP(this.enlargeContainer(), this.enlargeAnimation.nativeElement);
    }

    this.dataService.add(this.tempArr[0]);
    this.selectedArr = this.dataService.selectedComparisonArray
    this.bondi = true;
    this.control.setValue('');

  }

  popUp() {
    alert("You've selected the maximum");
  }

  inputVal(e){
    console.log(this.btnView)

    if(this.btnView === 'comparison') {
      this.containerFLIP(this.shrinkContainer, this.enlargeAnimation.nativeElement);
      this.dataService.selectedComparisonArray = [];
      this.selectedArr = this.dataService.selectedComparisonArray;

      this.enlargeAnimation.nativeElement.dataset.state = 'shrink';
      this.enlargeAnimation.nativeElement.dataset.prevState = this.containerView;
      this.bondi = false;
    }
    if(this.btnView === 'detailed') {
    }
    this.toggleDataView(e);
    console.log(this.btnView)

  }

  deleteItem(e,i, el){
    this.dataService.selectedComparisonArray.splice(i, 1);
    if (this.dataService.selectedComparisonArray.length === 0) {
      // this.shrinkContainer()
      console.log('mynoLeng: ', this.dataService.selectedComparisonArray.length)
      el.dataset.state = el.dataset.prevState;
      el.dataset.prevState = this.containerView;
      console.log(this.dataService.selectedComparisonArray, this.selectedArr, 'bbarr')

      this.selectedArr = this.dataService.selectedComparisonArray;
      this.bondi = false;
      // console.log('from delete: ', this.containerFLIP);

      this.containerFLIP(this.shrinkContainer, this.enlargeAnimation.nativeElement);
    }
    // this.dataService.deleteItem(i, this.shrinkContainer);
  }

  passMyData(e, u) {
    this.tempArr[0] = {Name: e, Symbol: u};
  }

  getHighestValueForCharts(el) {
    let highNum = 0;
    el.map(els => {
      //check if els.high != null
      // console.log(els.high);
      if(els.high > highNum) {
        highNum = els.high;

      }
      console.log(highNum);
      return highNum;
      // if els.high = typeof number highNum = els.high
      // if (els.high > highNum)  highNum = els.high

    })
  }

  formatForJSON(i, el) {
    let obj = {};
    el.map(i => console.log(i))
    if(el.value === null) {
        return;
    }



    return {
      name: i.Symbol,
      series: [
        el
      ]
    }
  }


  // theReq(q, dank){
  //   this.dataService.getSlimy(dank)
  //     .subscribe(this.dataService.multi$.push(this.dataService.formatJSON(q, dank)))
  // }


  submitSearching() {

    let doh = [];
    let a$,b$,c$;
    if(this.btnView === 'detailed') {
      console.log(this.tempArr[0])
      // this.dataService.getTimeSeries(this.tempArr[0].Symbol).subscribe(el => {
      doh = [ this.dataService.getSlimy(this.tempArr[0]), this.dataService.getTimeSeries(this.tempArr[0].Symbol)]
      this.dataService.detailArray = forkJoin(doh).subscribe(el => {
        this.router.navigate(['/detail'])
        console.log('doommed :', el)
      })
      // this.dataService.getTimeSeries(this.tempArr[0].Symbol).subscribe((el)=> {
      //   console.log('btn-view: ',el)
      //   // this.dataService.getSlimy(this.tempArr[0].Symbol)
      //   this.router.navigate(['/detail'])
      // })
    }
    // if(this.btnView === 'comparison' ) {
      if(this.btnView === 'comparison') {
      for(let i = 0; i < this.dataService.selectedComparisonArray.length; i++) {
        doh.push(this.dataService.getSlimy(this.dataService.selectedComparisonArray[i])
        .pipe(map(el => {
          console.log('piped: ', el)
          // el.map(i => {
          //   console.log('piped n mapped: ', i)
          // })
          this.dataService.multi$.push(this.dataService.formatJSON(this.dataService.selectedComparisonArray[i], el))
        }
        )))
      }
      [a$,b$,c$] = doh;
      console.log('doh:', doh)
      forkJoin(doh).pipe(
        )
        .subscribe((i) => {
          console.log('sui:', i)
          this.router.navigate(['/comparison'])
        // this.dataService.changeChartsView();
        this.dataService.getBinalArrItems()
      })
    // }
    }
      }


  async submitSearch() {
    let a$,b$,c$;
    // var multi = [];
    // run http request for each iteration of selectedArray;
    // [a$,b$, c$].
    // let source = of([a$,b$, c$]);
    this.dataService.selectedComparisonArray.map(i => {
      this.dataService.getSlimy(i.Symbol).pipe(

        tap(yo => console.log('piped from component: ', yo))
        ).subscribe(
          el => {
            console.log(el)
            this.dataService.multi$.push(this.dataService.formatJSON(i, el))
            this.getHighestValueForCharts(el)
          // console.log(this.formatForJSON(i, el))

        },
        (err) => console.error(err),
        () => this.dataService.changeChartsView()
        )
      });

      // valz.forEach(o => console.log('variable: ', o))
      // console.log('variable: ', values);

      // console.log(this.dataService.showCharts)
      // return this.dataService.showCharts = true;

    // this.selectedArr.map(i => {
    //   console.log(i.Symbol);
    // });
  }


}
/*
Comparison
  1) press add button - add stock to selectedArr = [1];
  2) extend container to
  3) ngIf to show selected list
  2) if selectedArr >= 3 then popup()
  >>>>>>>>>>>>
  click on detailed view
  1) selectedArr = [];
  2) container to shrink
  3) remove

*/

  // get radioInoutVal() {
  //   return this.form.valueChanges.pipe(
  //     tap(i => console.log(i))
  //   )}
  // sendDataToArray(option) {
  //   this.selectedArr.push(option);
  //   console.log('from senddata2arr func:', option.Symbol);
  //   // this.selectedArr
  // }
//     inputVal(e){
//       if(this.btnView === 'comparison') {
//         this.selectedArr = [];
//         this.containerFLIP(this.shrinkContainer, this.enlargeAnimation.nativeElement);

//         // this.shrinkContainer();
//       }
//       console.log('clicked', e);
//       this.toggleDataView(e);
//     }
// }


