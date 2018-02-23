import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Destination, Place, Tour } from "./models/client.model";
import { Serializable } from "../utils/serializable";
import { CreateTour, GetDestinations, GetPlaces } from "./models/server.dtos";
import { Observable } from "rxjs/Observable";

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

  getList() {
    // let getTour = new GetTours();
    // getTour.Code = "1";
    // this.apiService.getEntities(getTour).subscribe(res => {
    //   console.log(res);
    // });
    return this.data;
  }

  addTour(model: Tour): Observable<Tour> {
    const dto = new CreateTour();
    Serializable.fromJSON(dto, model);
   return this.apiService.send(dto);
  }
}
