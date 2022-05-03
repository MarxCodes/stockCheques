import { TestBed } from '@angular/core/testing';

import { PracticeConttrollerService } from './practice-conttroller.service';

describe('PracticeConttrollerService', () => {
  let service: PracticeConttrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeConttrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
