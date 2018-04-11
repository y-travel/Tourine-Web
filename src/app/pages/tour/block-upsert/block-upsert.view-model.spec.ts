import { TestBed, inject } from '@angular/core/testing';

import { BlockUpsertViewModel } from './block-upsert.view-model.service';

describe('BlockUpsertViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockUpsert.ViewModelService]
    });
  });

  it('should be created', inject([BlockUpsert.ViewModelService], (service: BlockUpsert.ViewModelService) => {
    expect(service).toBeTruthy();
  }));
});
