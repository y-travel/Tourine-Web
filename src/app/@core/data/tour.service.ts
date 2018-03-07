import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Destination, Place, Tour, Person } from './models/client.model';
import { Serializable } from '../utils/serializable';
import { CreateTour, GetDestinations, GetPlaces, GetTours, GetLeaders, GetBlocks } from './models/server.dtos';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TourService {

  data = new Array<Tour>();

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

  addTour(model: Tour): Observable<Tour> {
    const dto = new CreateTour();
    Serializable.fromJSON(dto, model);
    console.log(dto);
    return this.apiService.send(dto);
  }
}
