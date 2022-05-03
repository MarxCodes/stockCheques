import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTabComponent } from './stock-tab.component';

describe('StockTabComponent', () => {
  let component: StockTabComponent;
  let fixture: ComponentFixture<StockTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
