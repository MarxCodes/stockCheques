import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlipTransitionsService } from './flip-transitions.service';
@Injectable({
  providedIn: 'root'
})
export class SearchControllerService {
  tempArr = [];
  selectedArr = [];
  containerView : string = 'shrink';
  btnView = 'detailed';
  bondi : boolean = false;
  control = new FormControl();

  @ViewChild('enlargeAnimation', { static: true}) enlargeAnimation : ElementRef;
  @ViewChild('btnContainer', { static: true }) btnSearchContainer: ElementRef;
  @ViewChild('searchBtn', { static: true}) searchBtn: ElementRef;

  constructor(private flipTransition: FlipTransitionsService) { }

  deleteItem(e, i) {
    this.selectedArr.splice(i, 1);
    if(this.selectedArr.length === 0) {
      this.shrinkContainer();
    }
  }

  shrinkContainer() {
    this.containerView = 'shrink';
    this.enlargeAnimation.nativeElement.dataset.state = this.containerView;
    this.bondi = false;
  }

  enlargeContainer() {
    this.containerView = 'enlarge';
    this.enlargeAnimation.nativeElement.dataset.state = this.containerView
  }

  toggleView(option1 = 'detailed', option2 = 'comparison') {
    // this.selectedArr = [];
    this.btnView = this.btnView ===  option1 ? option2 : option1;
    this.btnSearchContainer.nativeElement.dataset.view = this.btnView;
  }

  // addItem(el, flipFN : (a: string, b, c: ElementRef, d: string)  => void, fn:() => {}, str) {
  addItem(el, flipFN : ()  => void) {

      // console.log(this.passMyData())
      if (this.selectedArr.length >= 3) {
        return this.popUp();
      }

      // if(this.selectedArr.length)

      if (this.bondi === false) {
        el.dataset.prevState = this.containerView;
        // this.flipTransition.Dasflip('toggleState', this.enlargeContainer(), this.enlargeAnimation.nativeElement, 'enlarging');
        // flipFN(a, this.enlargeContainer(), c, string)
        // flipFN('toggleState',this.enlargeContainer(), this.enlargeAnimation.nativeElement, str);
        flipFN();

      }
      // this.selectedArr.push(this.control.value);
      this.selectedArr.push(this.tempArr[0]);
      this.bondi = true;
      this.control.setValue('');
  }

  popUp() {
    alert("You've selected the maximum");
  }

  // inputVal(fn: () => void, fu : ( a: string, b : any,c : ElementRef,d: any) => void) {
  inputVal(fn: () => void, fu : () => void) {

    if(this.btnView === 'comparison') {
      this.selectedArr = [];
      // this.containerView.padStart
      // this.flipTransition.Dasflip('toggleState', this.shrinkContainer, this.enlargeAnimation.nativeElement, 'flipping');
      fu();
      // this.shrinkContainer();
    }
    // this.toggleDataView(e);
    fn();
  }


  // toggleDataView(el) {
  //   this.flipTransition.Dasflip('toggleState', this.toggleView, this.searchBtn.nativeElement, 'flipping');
  // }


  sendDataToArray(option) {
    this.selectedArr.push(option);
    console.log('from senddata2arr func:', option.Symbol);
    this.selectedArr
  }
}
