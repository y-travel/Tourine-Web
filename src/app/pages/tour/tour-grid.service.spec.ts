import { TestBed, inject } from '@angular/core/testing';

import { TourGridService } from './tour-grid.service';

describe('TourGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourGridService]
    });
  });

  it('should be created', inject([TourGridService], (service: TourGridService) => {
    expect(service).toBeTruthy();
  }));
});
