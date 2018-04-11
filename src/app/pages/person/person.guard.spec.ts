import { TestBed, async, inject } from '@angular/core/testing';

import { PersonGuard } from './person.guard';

describe('PersonGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonGuard]
    });
  });

  it('should ...', inject([PersonGuard], (guard: PersonGuard) => {
    expect(guard).toBeTruthy();
  }));
});
