import {
  Component,
  ElementRef,
  OnInit,
  Query,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import * as data from '../arrayFun.json';

@Component({
  selector: 'app-practice-control',
  templateUrl: './practice-control.component.html',
  styleUrls: ['./practice-control.component.scss']
})
export class PracticeControlComponent  {

  @ViewChild('containerRef', { static: true }) containerRef: ElementRef;
  @ViewChild('btnContainer', { static: true }) btnSearchContainer: ElementRef;
  @ViewChildren('btnContainer')
  btnContainerChildren: QueryList<ElementRef>;
  @ViewChild('searchBtn', { static: true}) searchBtn: ElementRef;

  // @ViewChild('[data-flip]', { static: true }) dataflip: ElementRef;
  products: any = (data as any).default;

  form = new FormGroup({
    sizable: new FormControl('detailed'),
  });
  control = new FormControl();
  detailed = 'detailed';
  comparison = 'comparison';
  btnView = 'detailed';
  tempArr = [];
  selectedArr = [];
  condition = false;
  bondi : boolean = false;
  @ViewChild('enlargeAnimation', { static: true}) enlargeAnimation : ElementRef;
  enlarge = 'enlarge';
  shrink = 'shrink';
  containerView = 'shrink';
  constructor() {}



  fn() {}

  search() {}

  toggleView() {
    // this.selectedArr = [];
    this.btnView = this.btnView === 'detailed' ? 'comparison' : 'detailed';
    this.btnSearchContainer.nativeElement.dataset.view = this.btnView;
  }

  // toggleEnlarge() {
  //   this.containerView = this.containerView === 'shrink' ? 'enlarge' : 'shrink';
  //   console.log('toggledEnglarder', this.containerView);
  //   this.enlargeAnimation.nativeElement.dataset.state = this.containerView;
  // }




  Dasflip(toggleState, firstEl, getLastEl = () => firstEl) {
    const firstRect = this.getRect(firstEl);
    // console.log('is there a first rectangle?', firstRect);
    requestAnimationFrame(() => {
      this.toggleView();

      let lastEl = getLastEl();
      const lastRect = this.getRect(lastEl);

      // console.log('is there a last rectangle?', lastRect);
      //Invert
      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;

      console.log({ dx, dy, dw, dh });

      lastEl.dataset.flipping = true;
      // console.log('lastEL', lastEl);

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
    // console.log('is there a first rectangle?', firstRect);
    requestAnimationFrame(() => {

      let lastEl = getLastEl();
      const lastRect = this.getRect(lastEl);

      // console.log('is there a last rectangle?', lastRect);
      //Invert
      const bx = String(lastRect.x - firstRect.x);
      const by = String(lastRect.y - firstRect.y);
      const bw = String(lastRect.width / firstRect.width);
      const bh = String(lastRect.height / firstRect.height);

      // lastEl.dataset.enlarging = true;
      lastEl.dataset.enlarging = true;

      // console.log('lastEL', lastEl);

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

    get radioInoutVal() {
      return this.form.valueChanges.pipe(
        tap(i => console.log(i))
      )}

      enlargeContainer() {
        this.containerView = 'enlarge';
        this.enlargeAnimation.nativeElement.dataset.state = this.containerView;
      }

      shrinkContainer() {
        this.containerView = 'shrink';
        this.enlargeAnimation.nativeElement.dataset.state = this.containerView;
        this.bondi = false;
      }

    add(el) {
      // console.log(this.passMyData())
       if (this.selectedArr.length >= 3) {
        return this.popUp();
      }

      // if(this.selectedArr.length)

      if (this.bondi === false) {
        el.dataset.prevState = this.containerView;
        this.containerFLIP(this.enlargeContainer(), this.enlargeAnimation.nativeElement);
      }
      // this.selectedArr.push(this.control.value);
      this.selectedArr.push(this.tempArr[0]);
      this.bondi = true;
      this.control.setValue('');
      // console.log(this.selectedArr);
      // this.passMyData(event, el);
    }

    popUp() {
      alert("You've selected the maximum");
    }

    inputVal(e){
      if(this.btnView === 'comparison') {
        this.selectedArr = [];
        // this.containerView.padStart
        this.containerFLIP(this.shrinkContainer, this.enlargeAnimation.nativeElement);

        // this.shrinkContainer();
      }
      this.toggleDataView(e);
    }

    deleteItem(e,i){
      this.selectedArr.splice(i, 1);
      if (this.selectedArr.length === 0) {
        this.shrinkContainer();
      }
    }

    passMyData(e, u) {
      // console.log('eveent: ', e, 'option?: ', u);
      this.tempArr[0] = {Name: e, Symbol: u};
      // console.log(this.tempArr)
      // alert(`event ${e},${u}`);
    }

    sendDataToArray(option) {
      this.selectedArr.push(option);
      console.log('from senddata2arr func:', option.Symbol);
      this.selectedArr
    }
  }
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


