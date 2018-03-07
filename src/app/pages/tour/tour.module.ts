import { NgModule } from '@angular/core';

import { routedComponents, TourRoutingModule } from './tour-routing.module';
import { TourUpsertComponent } from './tour-upsert/tour-upsert.component';
import { ReagentUpsertComponent } from './reagent-upsert.component';
import { EditPasswordComponent } from './edit-password.component';
import { DialogService } from '../../@core/utils/dialog.service';
import { COMMON_MODULES } from '../default';
import { TourGridService } from './tour-grid.service';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
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
    ...COMMON_MODULES,
    TourRoutingModule,
    TrnAgGridModule.withAgModule(),
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
