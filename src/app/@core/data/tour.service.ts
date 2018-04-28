import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Agency, Destination, Person, Place, TourPassengers, Tour, TourOption, TourBuyer } from './models/client.model';
import { Serializable } from '../utils/serializable';
import {
  DeleteTour, GetAgencies, GetBlocks, GetDestinations, GetLeaders, GetPlaces, GetTourBuyers, GetTourOptions, GetTours, GetTourTicket, GetTourVisa,
  UpsertTour
} from './models/server.dtos';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TourService {

  data = new Array<Tour>();
  //@TODO Optimize json

  upsertTour = (model: Tour): Observable<Tour> => this.apiService.send(Serializable.fromJSONToType(UpsertTour, model));

  deleteTour = (model: Tour): Observable<void> => this.apiService.send(Serializable.fromJSONToType(DeleteTour, model));

  constructor(private apiService: ApiService) {
  }

  getPlaces(): Observable<Place[]> {
    const dto = new GetPlaces();
    return this.apiService.getEntities(dto);
  }

  getDistinations(): Observable<Destination[]> {
    const dto = new GetDestinations();
    return this.apiService.getEntities(dto);
  }

  getLeaders(): Observable<Person[]> {
    const dto = new GetLeaders();
    return this.apiService.getEntities(dto);
  }

  getList(): Observable<Tour[]> {
    const query = new GetTours();
    return this.apiService.getEntities(query);
  }

  getBlocks(tourId: string): Observable<Tour[]> {
    const query = new GetBlocks();
    query.tourId = tourId;
    return this.apiService.getEntities(query);
  }

  getAgencies(): Observable<Agency[]> {
    const dto = new GetAgencies();
    return this.apiService.getEntities(dto);
  }

  getOptions(tourId: string): Observable<TourOption[]> {
    const dto = new GetTourOptions();
    dto.tourId = tourId;
    return this.apiService.getEntities(dto);
  }

  getTickets(tourId: string): Observable<TourPassengers> {
    const query = new GetTourTicket();
    query.tourId = tourId;
    return this.apiService.get(query);
  }

  getVisa(tourId: string, have: boolean = true): Observable<TourPassengers> {
    const query = new GetTourVisa();
    query.tourId = tourId;
    query.have = have;
    return this.apiService.get(query);
  }

  getTourBuyers(tourId: string): Observable<TourBuyer[]> {
    const query = new GetTourBuyers();
    query.tourId = tourId;
    return this.apiService.get(query);
  }
}
