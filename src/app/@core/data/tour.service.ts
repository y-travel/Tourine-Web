import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Tour } from "./models/client.model";
import { Serializable } from "../utils/serializable";

@Injectable()
export class TourService {

  data = new Array<Tour>();

  constructor(private apiService: ApiService) {
    this.fillData();
  }

  getList() {
    // let getTour = new GetTours();
    // getTour.Code = "1";
    // this.apiService.getEntities(getTour).subscribe(res => {
    //   console.log(res);
    // });
    return this.data;
  }

  addTour(model: Tour) {
    this.data.push(model);
  }

  private fillData() {
    this.data = Serializable.fromJSONToArray(Tour, [
        {
          id: 1,
          destinationId: 1,
          duration: 7,
          adultCount: 3,
          adultMinPrice: 1000000,
          busPrice: 120000,
          roomPrice: 300000,
          foodPrice: 150000,
          capacity:100,
          infantPrice: 120000,
          date: Date.now(),
          placeId: 1
        },
        {
          id: 2,
          destinationId: 1,
          duration: 7,
          adultCount: 3,
          adultMinPrice: 1000000,
          busPrice: 120000,
          roomPrice: 300000,
          foodPrice: 150000,
          infantPrice: 120000,
          capacity:100,
          date: Date.now(),
          placeId: 2
        },
        {
          id: 3,
          destinationId: 2,
          duration: 7,
          adultCount: 3,
          adultMinPrice: 1000000,
          busPrice: 120000,
          roomPrice: 300000,
          foodPrice: 150000,
          infantPrice: 120000,
          date: Date.now(),
          capacity:100,
          placeId: 3
        }
      ]
    );
  }
}
