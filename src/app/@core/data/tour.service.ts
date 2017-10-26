import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { GetTours } from "./models/server.dtos";

@Injectable()
export class TourService {

  data = [    {
    'destination': 'نجف',
    'date': '96/08/02',
    'hotel': 'قصرالصور',
    'capacity': '52',
    'status': 'اعزام',
  },
    {
      'destination': 'کربلا',
      'date': '96/08/05',
      'hotel': 'قصرالصور',
      'capacity': '35',
      'status': 'ثبت نام',
    },
  ];

  constructor(private apiService:ApiService){

  }

  getList() {
    let getTour=new GetTours();
    getTour.Code="1";
    this.apiService.getEntities(getTour).subscribe(res=>{
      console.log(res);
    });
    return this.data;
  }
}
