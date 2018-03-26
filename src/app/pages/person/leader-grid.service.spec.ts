import { TestBed, inject } from '@angular/core/testing';

import { LeaderGridService } from './leader-grid.service';

describe('LeaderGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderGridService]
    });
  });

  it('should be created', inject([LeaderGridService], (service: LeaderGridService) => {
    expect(service).toBeTruthy();
  }));
});
