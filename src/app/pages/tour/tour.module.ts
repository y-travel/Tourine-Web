import { NgModule } from '@angular/core';

import { ROUTED_COMPONENTS, TourRoutingModule } from './tour-routing.module';
import { TourUpsertComponent } from './tour-upsert/tour-upsert.component';
import { ReagentUpsertComponent } from './reagent-upsert.component';
import { EditPasswordComponent } from './edit-password.component';
import { DialogService } from '../../@core/utils/dialog.service';
import { COMMON_MODULES } from '../default';
import { TourGridService } from './tour-grid.service';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { AgencyUpsertComponent } from './agency-upsert/agency-upsert.component';
import { BlockUpsertComponent } from './block-upsert/block-upsert.component';

const ENTRY_COMPONENTS = [
  TourUpsertComponent,
  ReagentUpsertComponent,
  EditPasswordComponent,
  AgencyUpsertComponent,
  BlockUpsertComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    TourRoutingModule,
    TrnAgGridModule.withAgModule(),
  ],
  declarations: [
    ...ENTRY_COMPONENTS,
    ...ROUTED_COMPONENTS,
  ],
  providers: [DialogService, TourGridService],
  entryComponents: ENTRY_COMPONENTS
})
export class TourModule {
}
