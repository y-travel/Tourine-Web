import { TestBed, inject } from '@angular/core/testing';

import { TeamGridService } from './team-grid.service';

describe('TeamGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamGridService]
    });
  });

  it('should be created', inject([TeamGridService], (service: TeamGridService) => {
    expect(service).toBeTruthy();
  }));
});
