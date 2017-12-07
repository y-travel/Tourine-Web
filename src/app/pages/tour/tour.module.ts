import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";

import { ThemeModule } from '../../@theme/theme.module';
import { routedComponents, TourRoutingModule } from "./tour-routing.module";
import { TourUpsertComponent } from "./tour-upsert.component";
import { AppTranslationModule } from "../../app-translation.module";
import { CouponUpsertComponent } from "./coupon-upsert.component";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { EditPasswordComponent } from "./edit-password.component";
import { DialogService } from "../../@core/utils/dialog.service";

const entryComponents = [
  TourUpsertComponent,
  CouponUpsertComponent,
  ReagentUpsertComponent,
  EditPasswordComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    MatDialogModule,
    TourRoutingModule,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule,
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
