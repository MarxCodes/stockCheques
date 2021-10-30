import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchControllerService {
  selectedArr = [];
  containerView : string = 'shrink';
  btnView = 'detailed';
  bondi : boolean = false;

  @ViewChild('enlargeAnimation', { static: true}) enlargeAnimation : ElementRef;
  @ViewChild('btnContainer', { static: true }) btnSearchContainer: ElementRef;

  constructor() { }

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
    this.enlargeAnimation.nativeElement.dataset.state = this.
  }

  toggleView(option1 = 'detailed', option2 = 'comparison') {
    // this.selectedArr = [];
    this.btnView = this.btnView ===  option1 ? option2 : option1;
    this.btnSearchContainer.nativeElement.dataset.view = this.btnView;
  }
}
