import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { Block, Person, FindPersonFromNc, UpdatePerson, AddNewPerson, GetPersons, GetLeaders, GetAgencies, Agency, UpsertTeam, TeamMember, GetTourFreeSpace, TourOption, PersonIncome, OptionType, GetTourOptions, GetTourTeams, DeleteTeam, GetPersonsOfTeam, TeamPassenger, UpsertLeader, DeleteLeader, GetPersonsOfTour, TourPassenger, PassengerReplacement, Tour, GetTourAgency, TourTeammember, Team, UpdateTeamList, UpdateTourPrice } from './models';
import { Serializable } from '../utils/serializable';

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

  upsertLeader(model: Person): Observable<Person> {
    const dto = new UpsertLeader();
    dto.person = model;
    return this.apiService.send(dto);
  }

  getPerson(model: Person): Observable<Person[]> {
    const dto = new GetPersons();
    Serializable.fromJSON(dto, model);
    return this.apiService.getEntities(dto);
  }

  getTourAgency(tourId: string): Observable<Tour[]> {
    const query = new GetTourAgency();
    query.tourId = tourId;
    query.loadChild = true;
    return this.apiService.get(query);
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

  upsertTeam(model: TeamMember[], blockModel: Block, teamId: string = undefined): Observable<void> {
    const dto = new UpsertTeam();
    dto.tourId = blockModel.id;//@TODO
    dto.buyer = model[0];
    dto.teamId = teamId ? teamId : undefined;
    dto.passengers = model.slice(1, model.length)
    dto.infantPrice = blockModel.infantPrice;
    dto.basePrice = blockModel.basePrice;
    dto.totalPrice = blockModel.totalPrice;
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

  getTourTeams(id: string): Observable<Block[]> {
    const query = new GetTourTeams();
    query.tourId = id;
    return this.apiService.getEntities(query);
  }

  deleteTeam(model: Block) {
    const query = new DeleteTeam();
    query.teamId = model.id;
    return this.apiService.send(query);
  }

  getTeamMembers(id: string): Observable<TeamPassenger> {
    const query = new GetPersonsOfTeam();
    query.teamId = id;
    return this.apiService.get(query);
  }

  getTourMembers(id: string): Observable<TourPassenger> {
    const query = new GetPersonsOfTour();
    query.tourId = id;
    return this.apiService.get(query);
  }

  deleteLeader(id: string) {
    const query = new DeleteLeader();
    query.id = id;
    return this.apiService.send(query);
  }

  passengerReplacement(tourId: string, destId: string, passengers: TeamMember[], agencyId: string): Observable<TourTeammember> {
    const dto = new PassengerReplacement();
    //@TODO: ughly
    dto.tourId = tourId;
    dto.destTourId = destId;
    dto.passengers = passengers;
    dto.agencyId = agencyId;
    return this.apiService.send(dto);
  }

  updateTeamList(model: any) {
    const dto = new UpdateTeamList();
    dto.teams = model.teams;
    return this.apiService.send(dto);
  }

  updateTourPrice(model: any) {
    const dto = new UpdateTourPrice();
    dto.basePrice = model.basePrice;
    dto.tourId = model.id;
    dto.infantPrice = model.infantPrice;
    dto.busPrice = model.busPrice;
    dto.roomPrice = model.roomPrice;
    dto.foodPrice = model.foodPrice;
    return this.apiService.send(dto);
  }
}
