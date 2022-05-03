import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  animations: [trigger('zoom', [
    state('normal', style({
      backgroundColor: '#ffffff',
    })),
    state('zoom', style({
      backgroundColor: '#f1f2f6',
    })),
    transition('normal <=> zoom', animate(300))
  ]),]
})
export class OptionComponent implements OnInit {

  @Input() value;
  @Input() i;

  @Input() baldValue;
  state: string = 'normal';

  click$: Observable<string>;
  @Output() passData: EventEmitter<any> = new EventEmitter();

  constructor(private host: ElementRef) {}
  mouseEvent(event, i){
    console.log(event, i);
    this.state = event.type === 'mouseenter' ? 'zoom' : 'normal';

  }
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
