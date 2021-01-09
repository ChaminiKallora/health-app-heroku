import { TestBed } from '@angular/core/testing';

import { StressDetectionService } from './stress-detection.service';

describe('StressDetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StressDetectionService = TestBed.get(StressDetectionService);
    expect(service).toBeTruthy();
  });
});
