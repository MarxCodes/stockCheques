import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeConsoleComponent } from './practice-console.component';

describe('PracticeConsoleComponent', () => {
  let component: PracticeConsoleComponent;
  let fixture: ComponentFixture<PracticeConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
