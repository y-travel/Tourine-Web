import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Agency, PersonAgency } from './models/client.model';
import { Serializable } from '../utils/serializable';
import { GetAgencies, CreateAgency } from './models/server.dtos';
import { Observable } from 'rxjs/Rx';
import { Person, GetTourFreeSpace, Block, Tour, ReserveBlock } from './models';

@Injectable()
export class AgencyService {

  constructor(private apiService: ApiService) {
  }

  getList(): Observable<Agency[]> {
    const query = new GetAgencies();
    return this.apiService.getEntities(query);
  }

  addNewAgency(model: PersonAgency): Observable<Agency> {
    const dto = new CreateAgency();
    Serializable.fromJSON(dto, model);
    console.log(dto);
    return this.apiService.send(dto);
  }

  getTourFreeSpace(model: string) : Observable<string> {
    const query = new GetTourFreeSpace();
    Serializable.fromJSON(query, model);
    return this.apiService.send(query);
  }

  reserveBlock(model: Block) : Observable<Tour> {
    const query = new ReserveBlock();
    Serializable.fromJSON(query, model);
    return this.apiService.send(query);
  }
}
