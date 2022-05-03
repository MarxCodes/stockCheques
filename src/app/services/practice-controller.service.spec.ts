import { TestBed } from '@angular/core/testing';

import { PracticeControllerService } from './practice-controller.service';

describe('PracticeControllerService', () => {
  let service: PracticeControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
