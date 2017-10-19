import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from '../../@theme/theme.module';
import { TourService } from "../../@core/data/tour.service";
import { TourRoutingModule, routedComponents } from "./tour-routing.module";
import { ApiService } from "../../@core/data/api.service";
import { DataService } from "../../@core/data/data.service";

@NgModule({
  imports: [
    ThemeModule,
    TourRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    TourService,
    ApiService,
    DataService
  ]
})
export class TourModule {
}
