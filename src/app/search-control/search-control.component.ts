import { AfterContentChecked, Component, ElementRef, OnChanges, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import * as data from '../arrayFun.json';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss']
})
export class SearchControlComponent implements OnInit, OnChanges   {
  buttonDisabled: boolean = true;
  form = new FormGroup({
    food: new FormControl('detailed')
  });

  // control = new FormControl();
  @ViewChild('myRef', { static: true}) myRef : ElementRef;
  @ViewChild('myInput', { static: true}) myInput : ElementRef;
  // @ViewChild('deleteTextBtn', { static: true}) deleteTextBtn: ElementRef;
  // view = 'view';
  @ViewChild('searchGrid', { static: true}) searchGrid : ElementRef;
  grid: string = 'detailed';
  detailed = 'detailed';
  comparison = 'comparison';
  condition;

  dog;
  cat;
  user = true;
  control = new FormControl();
  clickedEls = [];
  products: any = (data as any).default;
  @ViewChild('enlargeAnimation', { static: true}) tref: ElementRef;
  view: string = 'small';
  big = 'big';
  small = 'small';
  searchInputFull = false;

  constructor(private ds: DataService) { }

  addItem() {
    // this.myInput.nativeElement.value = ' ';

    let val = this.control.value;
    this.control.setValue('');
    console.log(this.control.value);
  }

  addToMulti() {

  }

  deleteText() {
    this.control.setValue('');
    // this.control.
    this.myInput.nativeElement.focus();
  }
  ngOnInit(): void {
    console.log(this.form.value);
    }

  ngOnChanges(){
    console.log(this.form.valueChanges.pipe(
      tap(i => console.log(i))
    ))
    // console.log(this.myRef.nativeElement.value);
  }

  onItemChange(value){
    // console.log(" Value is : ", value );
    this.condition = !this.condition;
    this.toggleGrid()
    // this.toggleGrid();
    // console.log(this.condition)
 }

 lengthOfArrayFull(){
  if (this.clickedEls.length === 3) {
    this.buttonDisabled = false;
    return true;
  }
  return false;
}

passMyData(e, u) {
  console.log('eveent: ', e, 'option?: ', u);
  if (this.clickedEls.length > 3) {
    return this.popUp();
  }

  !this.lengthOfArrayFull() ? this.clickedEls.push(u) : this.popUp();

  console.log('els: ', this.clickedEls)
}


popUp() {
  alert('already added 4 stocks');

}
deleteItem(e,i){
  this.clickedEls.splice(i, 1);
}

///
toggleGrid() {
  this.grid = this.grid === 'detailed' ? 'comparison' : 'detailed';
  this.searchGrid.nativeElement.dataset.view = this.grid;
}

toggleState() {
  this.view = this.view === 'small' ? 'big' : 'small';
  this.tref.nativeElement.dataset.state = this.view;
}

checkIt(el) {
  console.log('called everytime');
  el.dataset.prevState = this.view;
  this.flip(this.toggleState, this.tref.nativeElement);
  console.log(this.grid)
  this.toggleGrid();
}

getRect(el) {
  return el.getBoundingClientRect();
}

flip(toggleState, firstEl, getLastEl = () => firstEl) {
  const firstRect = this.getRect(firstEl);
  requestAnimationFrame(() => {
    this.toggleState();
    let lastEl = getLastEl();
    const lastRect = this.getRect(lastEl);

    const dx = lastRect.x - firstRect.x;
    const dy = lastRect.y - firstRect.y;
    const dw = lastRect.width / firstRect.width;
    const dh = lastRect.height/ firstRect.height;
    console.log({ dx, dy, dw, dh });

    lastEl.dataset.flipping = true;

    lastEl.style.setProperty('--dx', dx);
    lastEl.style.setProperty('--dy', dy);
    lastEl.style.setProperty('--dw', dw);
    lastEl.style.setProperty('--dh', dh);

    requestAnimationFrame(() => {
      delete lastEl.dataset.flipping;
    })

  })
}

findSearchInputVal(){
  console.log(this.control.value);
}
}
