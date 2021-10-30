import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Input() value;
  @Input() baldValue;

  click$: Observable<string>;
  @Output() passData: EventEmitter<any> = new EventEmitter();

  constructor(private host: ElementRef) {}

  get element() {
    return this.host.nativeElement;
  }
  ngOnInit(): void {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
    // console.log(this.passData);
  }

  passedData() {

    this.baldValue = this.value;
    this.passData.emit(this.baldValue);
  }

  // addElToList() {
  //   this.passData.emit(this.baldValue);
  // }

}
