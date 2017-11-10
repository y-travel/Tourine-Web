import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";

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
import { CouponService } from "../../@core/data/coupon.service";

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
    Ng2SmartTableModule,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...tourComponents,
    ...routedComponents
  ],
  providers: [
    TourService,
    ApiService,
    DataService,
    FormFactory,
    CouponService,
  ],
  entryComponents: [
    TourUpsertComponent,
    CouponUpsertComponent,
    ReagentUpsertComponent,
    UserUpsertComponent,
  ]
})
export class TourModule {
}
