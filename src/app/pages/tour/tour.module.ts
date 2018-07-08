import { NgModule } from '@angular/core';

import { TourRoutingModule } from './tour-routing.module';
import { TourUpsertComponent } from './tour-upsert/tour-upsert.component';
import { DialogService } from '../../@core/utils/dialog.service';
import { COMMON_MODULES } from '../default';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { BlockUpsertComponent } from './block-upsert/block-upsert.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { TourPassengersComponent } from './tour-passengers/tour-passengers.component';
import { PassengerReplacementTourGridService } from '../passenger/passenger-replacement/passenger-replacement-tour-grid.service';
import { TourReportsComponent } from './tour-reports/tour-reports.component';
import { TourReportGridService } from './tour-reports/tour-reports.service';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';
import { TourComponent } from './tour.component';
import { TourListComponent } from './tour-list/tour-list.component';

const ENTRY_COMPONENTS = [
  TourUpsertComponent,
  BlockUpsertComponent,
  BuyerListComponent,
  TourPassengersComponent,
  TourReportsComponent,
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  TourComponent,
  TourListComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    TourRoutingModule,
    TrnAgGridModule.withAgModule(),
  ],
  providers: [
    DialogService,
    PassengerReplacementTourGridService,
    TourReportGridService,
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS
})
export class TourModule {
}
