import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { USData, Canada, Mexico, SouthAmerica, asia, Europe, globalCommodities, USCommoditiies,
  europeanCommodities, Industrial, Financial, construction, energy } from '../international_symbols';
@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
  // encapsulation: ViewEncapsulation
})
export class TabContainerComponent implements OnInit {
  // Americas
  usData = USData;
  canadaData = Canada;
  mexicoData = Mexico;
  southAmericaData = SouthAmerica;
  //asia
  asiaData = asia;
  //eirope
  europeData = Europe;
  //commodities
  globalCommodityData = globalCommodities;
  usCommodityData = USCommoditiies;
  europeanCommodityData = europeanCommodities;
  //industry
  industrialData = Industrial;
  financialData = Financial;
  constructionData = construction;
  energyData = energy;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.data);
  }

}
