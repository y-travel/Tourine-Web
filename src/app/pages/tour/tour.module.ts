import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ThemeModule } from '../../@theme/theme.module';
import { TourService } from "../../@core/data/tour.service";
import { TourRoutingModule, routedComponents } from "./tour-routing.module";
import { ApiService } from "../../@core/data/api.service";
import { DataService } from "../../@core/data/data.service";
import { TourUpsertComponent } from "./tour-upsert.component";
import { AppTranslationModule } from "../../app-translation.module";
import { CouponUpsertComponent } from "./coupon-upsert.component";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { FormFactory } from "../../@core/data/models";
import { UserUpsertComponent } from "./user-upsert.component";

const tourComponents = [
  TourUpsertComponent,
  CouponUpsertComponent,
  ReagentUpsertComponent,
  UserUpsertComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    TourRoutingModule,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...tourComponents,
    ...routedComponents
  ],
  providers: [],
  entryComponents: [
    TourUpsertComponent,
    CouponUpsertComponent,
    ReagentUpsertComponent,
    UserUpsertComponent,
  ]
})
export class TourModule {
}
