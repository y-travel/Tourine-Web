import { TestBed, inject } from '@angular/core/testing';

import { TourPassengersGridService } from './tour-passengers-grid.service';

describe('TourPassengersGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourPassengersGridService]
    });
  });

  it('should be created', inject([TourPassengersGridService], (service: TourPassengersGridService) => {
    expect(service).toBeTruthy();
  }));
});
