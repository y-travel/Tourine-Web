import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../../@core/data/api.service';
import { Person, FindPersonFromNc, UpdatePerson, AddNewPerson, GetPersons, GetLeaders, GetAgencies, Agency, CreateTeam, TeamMember, GetTourFreeSpace, TourOption, PersonIncome, OptionType, GetTourOptions, GetTourTeams, Team, DeleteTeam } from '../../@core/data/models';
import { Serializable } from '../../@core/utils/serializable';

@Injectable()
export class PersonService {

  constructor(private apiService: ApiService) {
  }

  GetPerson(nationalCode: string): Observable<Person> {
    const query = new FindPersonFromNc();
    query.nationalCode = nationalCode;
    return this.apiService.send(query);
  }

  UpdatePerson(model: Person) {
    const dto = new UpdatePerson();
    dto.person = model;
    return this.apiService.send(dto);
  }

  AddPerson(model: Person) {
    const dto = new AddNewPerson();
    dto.person = model;
    return this.apiService.send(dto);
  }

  getPerson(model: Person): Observable<Person[]> {
    const dto = new GetPersons();
    Serializable.fromJSON(dto, model);
    return this.apiService.getEntities(dto);
  }


  getPersons(): Observable<Person[]> {
    const dto = new GetPersons();
    return this.apiService.getEntities(dto);
  }

  getLeaders(): Observable<Person[]> {
    const dto = new GetLeaders();
    return this.apiService.getEntities(dto);
  }

  getAgency(): Observable<Agency[]> {
    const dto = new GetAgencies();
    return this.apiService.getEntities(dto);
  }

  addTeam(model: TeamMember[], id: string): Observable<void> {
    const dto = new CreateTeam();
    dto.tourId = id;//@TODO
    dto.buyer = model[0];
    dto.passengers = model.slice(1, model.length)
    return this.apiService.send(dto);
  }

  //@TODO: ugly
  getTourFreeSpace(id: string): Observable<string> {
    const query = new GetTourFreeSpace();
    query.tourId = id;
    return this.apiService.send(query);
  }

  getTourOptions(id: string): Observable<TourOption[]> {
    const query = new GetTourOptions();
    query.tourId = id;
    return this.apiService.getEntities(query);
  }

  getTourTeams(id: string): Observable<Team[]> {
    const query = new GetTourTeams();
    query.tourId = id;
    return this.apiService.getEntities(query);
  }

  deleteTeam(model: Team) {
    const query = new DeleteTeam();
    query.teamId = model.id;
    return this.apiService.send(query);
  }
}
