import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comparison-chart',
  template: `
    <div class="zippy">
    <div (click)="toggle()">Toggle</div>
    <div [hidden]="!visible">
<h1>bald</h1>    </div>
 </div>`,
  // templateUrl: './comparison-chart.component.html',
  styleUrls: ['./comparison-chart.component.css']
})
export class ComparisonChartComponent  {
  visible: boolean = true;
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(0);

    } else {
      this.close.emit(null);
    }
  }
  // constructor() { }
  // ngOnInit(): void {
  // }

}
