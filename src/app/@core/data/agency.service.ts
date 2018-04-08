import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Agency, PersonAgency } from './models/client.model';
import { Serializable } from '../utils/serializable';
import { GetAgencies, CreateAgency, FindPersonFromNc, UpdatePerson } from './models/server.dtos';
import { Observable } from 'rxjs/Rx';
import { Person, GetTourFreeSpace, Block, Tour, ReserveBlock, UpsertTour, UpdateBlock } from './models';

@Injectable()
export class AgencyService {

  constructor(private apiService: ApiService) {
  }

  getList(): Observable<Agency[]> {
    const query = new GetAgencies();
    query.isAll = false;
    return this.apiService.getEntities(query);
  }

  addNewAgency(model: PersonAgency): Observable<Agency> {
    const dto = new CreateAgency();
    Serializable.fromJSON(dto, model);
    console.log(dto);
    return this.apiService.send(dto);
  }

  getTourFreeSpace(id: string): Observable<string> {
    const query = new GetTourFreeSpace();
    query.tourId = id;
    //Serializable.fromJSON(query, model);
    return this.apiService.send(query);
  }

  reserveBlock(model: Block): Observable<Tour> {
    const query = new ReserveBlock();
    model.parentId = model.id;
    model.id = undefined;
    Serializable.fromJSON(query, model);
    return this.apiService.send(query);
  }

  UpdateReservedBlock(model: Block): Observable<Tour> {
    const query = new UpdateBlock();
    Serializable.fromJSON(query, model);
    return this.apiService.send(query);
  }
}
