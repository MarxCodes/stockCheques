import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeControlComponent } from './practice-control.component';

describe('PracticeControlComponent', () => {
  let component: PracticeControlComponent;
  let fixture: ComponentFixture<PracticeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
