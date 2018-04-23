import { TestBed, inject } from '@angular/core/testing';

import { TourReportGridService } from './tour-reports.service';

describe('TourReportGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourReportGridService]
    });
  });

  it('should be created', inject([TourReportGridService], (service: TourReportGridService) => {
    expect(service).toBeTruthy();
  }));
});
