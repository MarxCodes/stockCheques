import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLineChartComponent } from './detail-line-chart.component';

describe('DetailLineChartComponent', () => {
  let component: DetailLineChartComponent;
  let fixture: ComponentFixture<DetailLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
