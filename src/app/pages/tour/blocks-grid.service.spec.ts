import { TestBed, inject } from '@angular/core/testing';

import { BlocksGridService } from './blocks-grid.service';

describe('BlocksGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlocksGridService]
    });
  });

  it('should be created', inject([BlocksGridService], (service: BlocksGridService) => {
    expect(service).toBeTruthy();
  }));
});
