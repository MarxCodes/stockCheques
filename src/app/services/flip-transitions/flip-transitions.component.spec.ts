import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipTransitionsComponent } from './flip-transitions.component';

describe('FlipTransitionsComponent', () => {
  let component: FlipTransitionsComponent;
  let fixture: ComponentFixture<FlipTransitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipTransitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
