import { TestBed, inject } from '@angular/core/testing';

import { PersonUpsertViewModel } from './person-upsert.view-model';

describe('PersonUpsertViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonUpsertViewModel]
    });
  });

  it('should be created', inject([PersonUpsertViewModel], (service: PersonUpsertViewModel) => {
    expect(service).toBeTruthy();
  }));
});
