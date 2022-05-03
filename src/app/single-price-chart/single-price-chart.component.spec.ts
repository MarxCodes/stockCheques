import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePriceChartComponent } from './single-price-chart.component';

describe('SinglePriceChartComponent', () => {
  let component: SinglePriceChartComponent;
  let fixture: ComponentFixture<SinglePriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePriceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
