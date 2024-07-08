import { TestBed, inject } from '@angular/core/testing';

import { AgencyTourListGridService } from './agency-tour-list-grid.service';

describe('AgencyTourListGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyTourListGridService]
    });
  });

  it('should be created', inject([AgencyTourListGridService], (service: AgencyTourListGridService) => {
    expect(service).toBeTruthy();
  }));
});
