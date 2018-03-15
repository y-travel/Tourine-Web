import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../../@core/data/api.service';
import { Person, FindPersonFromNc , UpdatePerson, AddNewPerson  } from '../../@core/data/models';

@Injectable()
export class PersonService {

  constructor(private apiService: ApiService) { }

  GetPerson(nationalCode: string) : Observable<Person>{
    const query = new FindPersonFromNc();
    query.nationalCode = nationalCode;
    return this.apiService.send(query);
  }

  UpdatePerson(model : Person) {
    const dto = new UpdatePerson();
    dto.person = model;
    return this.apiService.send(dto);
  }

  AddPerson(model: Person) {
    const dto = new AddNewPerson();
    dto.person = model;
    return this.apiService.send(dto);
  }
}
  