import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';
import { TourService } from './tour.service';
import { PlayerService } from './player.service';
import { FormFactory } from "./models/form-factory";
import { DataService } from "./data.service";
import { ApiService } from "./api.service";

const SERVICES = [
  UserService,
  StateService,
  TourService,
  ApiService,
  DataService,
  FormFactory,
  PlayerService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
