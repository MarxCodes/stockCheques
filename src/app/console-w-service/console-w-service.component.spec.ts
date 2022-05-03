import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleWServiceComponent } from './console-w-service.component';

describe('ConsoleWServiceComponent', () => {
  let component: ConsoleWServiceComponent;
  let fixture: ComponentFixture<ConsoleWServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleWServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleWServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
