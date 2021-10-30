import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioElComponent } from './radio-el.component';

describe('RadioElComponent', () => {
  let component: RadioElComponent;
  let fixture: ComponentFixture<RadioElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioElComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
