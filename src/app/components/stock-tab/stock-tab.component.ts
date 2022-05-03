import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-stock-tab',
  templateUrl: './stock-tab.component.html',
  styleUrls: ['./stock-tab.component.scss']
})
export class StockTabComponent implements OnInit, OnChanges{
  @Input() item;
  @ViewChild('iconRef', { static: true }) iconRef: ElementRef;

  first;
  increase;
  last;
  percent;
  dent = null;
  // percent =
  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.percent = this.calculatePercentage(this.item.first, this.item.last)
  }

  ngOnChanges() {

  }
  calculatePercentage(first: number,last: number) {
    let delta = last - first;
    let signOff = Math.sign(delta)
    let percent = ((delta / first) * 100).toFixed(2);
    // let toFixed = percent.toFixed(2);
    if(signOff === 1){
      this.increase = true;
      // this.iconRef.nativeElement.
    } else {
      this.increase = false;
    }
    return percent
  }
  // if dent = positive {
    //
    //
//}
  // }

  workOut(a,b) {

    // let delta = this.first - this.last;
    let delta = a - b;

    return ((delta / a) * 100).toFixed(2);
    // let delthis.first - this.last /
  }
}
