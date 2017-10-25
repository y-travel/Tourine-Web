import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from '../../@theme/theme.module';
import { TourService } from "../../@core/data/tour.service";
import { TourRoutingModule, routedComponents } from "./tour-routing.module";
import { ApiService } from "../../@core/data/api.service";
import { DataService } from "../../@core/data/data.service";
import { TourUpsertComponent } from "./tour-upsert.component";
import { AppTranslationModule } from "../../app-translation.module";

const tourComponents=[
  TourUpsertComponent
];

@NgModule({
  imports: [
    ThemeModule,
    TourRoutingModule,
    Ng2SmartTableModule,
    AppTranslationModule,
  ],
  declarations: [
    ...tourComponents,
    ...routedComponents
  ],
  providers: [
    TourService,
    ApiService,
    DataService,
  ],
  entryComponents:[
    TourUpsertComponent
  ]
})
export class TourModule {
}
