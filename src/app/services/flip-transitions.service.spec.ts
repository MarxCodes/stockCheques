import { TestBed } from '@angular/core/testing';

import { FlipTransitionsService } from './flip-transitions.service';

describe('FlipTransitionsService', () => {
  let service: FlipTransitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlipTransitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
