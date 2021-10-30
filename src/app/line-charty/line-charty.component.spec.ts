import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartyComponent } from './line-charty.component';

describe('LineChartyComponent', () => {
  let component: LineChartyComponent;
  let fixture: ComponentFixture<LineChartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
