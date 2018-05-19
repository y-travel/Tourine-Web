import { inject, TestBed } from '@angular/core/testing';
import { PersonService } from '../../@core/data/person.service';


describe('PersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService]
    });
  });

  it('should be created', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
