import { NgModule } from '@angular/core';
import { AgGridModule } from "ag-grid-angular";

import { routedComponents, TourRoutingModule } from "./tour-routing.module";
import { TourUpsertComponent } from "./tour-upsert/tour-upsert.component";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { EditPasswordComponent } from "./edit-password.component";
import { DialogService } from "../../@core/utils/dialog.service";
import { commonModules } from "../default";
import { TourGridService } from "./tour-grid.service";
import { HeaderComponent } from "../../@theme/components/header-component/header.component";
import { AgencyUpsertComponent } from './agency-upsert/agency-upsert.component';
import { BlockUpsertComponent } from './block-upsert/block-upsert.component';

const entryComponents = [
  TourUpsertComponent,
  ReagentUpsertComponent,
  EditPasswordComponent,
  AgencyUpsertComponent,
  BlockUpsertComponent,
];

@NgModule({
  imports: [
    ...commonModules,
    TourRoutingModule,
    AgGridModule.withComponents([
      HeaderComponent,
    ]),
  ],
  declarations: [
    ...entryComponents,
    ...routedComponents,
  ],
  providers: [DialogService, TourGridService],
  entryComponents: entryComponents
})
export class TourModule {
}
