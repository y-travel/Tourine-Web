import { TestBed, inject } from '@angular/core/testing';

import { TourUpsertViewModel } from './tour-upsert.view-model';

describe('TourUpsertViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TourUpsertViewModel]
    });
  });

  it('should be created', inject([TourUpsertViewModel], (service: TourUpsertViewModel) => {
    expect(service).toBeTruthy();
  }));
});
