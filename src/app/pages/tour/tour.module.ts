import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from '../../@theme/theme.module';
import { TourService } from "../../@core/data/tour.service";
import { TourRoutingModule, routedComponents } from "./tour-routing.module";

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
    TourService
  ]
})
export class TourModule {
}
