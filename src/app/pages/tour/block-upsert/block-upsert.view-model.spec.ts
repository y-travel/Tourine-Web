import { TestBed, inject } from '@angular/core/testing';

import { BlockUpsertViewModel } from './block-upsert.view-model';

describe('BlockUpsertViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockUpsertViewModel]
    });
  });

  it('should be created', inject([BlockUpsertViewModel], (service: BlockUpsertViewModel) => {
    expect(service).toBeTruthy();
  }));
});
