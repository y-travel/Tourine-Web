import { NgModule } from '@angular/core';
import { routedComponents, TourRoutingModule } from "./tour-routing.module";
import { TourUpsertComponent } from "./tour-upsert.component";
import { CouponUpsertComponent } from "./coupon-upsert.component";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { EditPasswordComponent } from "./edit-password.component";
import { DialogService } from "../../@core/utils/dialog.service";
import { commonModules } from "../default";

const entryComponents = [
  TourUpsertComponent,
  CouponUpsertComponent,
  ReagentUpsertComponent,
  EditPasswordComponent,
];

@NgModule({
  imports: [
    ...commonModules,
    TourRoutingModule,
  ],
  declarations: [
    ...entryComponents,
    ...routedComponents
  ],
  providers: [DialogService],
  entryComponents: entryComponents
})
export class TourModule {
}
