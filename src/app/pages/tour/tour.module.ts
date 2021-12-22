import { NgModule } from '@angular/core';

import { TourRoutingModule } from './tour-routing.module';
import { TourUpsertComponent } from './tour-upsert/tour-upsert.component';
import { DialogService } from '../../@core/utils/dialog.service';
import { COMMON_MODULES } from '../default';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { BlockUpsertComponent } from './block-upsert/block-upsert.component';
import { TourBuyersComponent } from './tour-buyers/tour-buyers.component';
import { TourPassengersComponent } from './tour-passengers/tour-passengers.component';
import { PassengerReplacementTourGridService } from '../passenger/passenger-replacement/passenger-replacement-tour-grid.service';
import { TourReportsComponent } from './tour-reports/tour-reports.component';
import { TourReportGridService } from './tour-reports/tour-reports-grid.service';
import { TourComponent } from '../tour/tour.component';
import { AgencyTourListComponent } from './agensy-tour-list/agency-tour-list.component';
import { TourListComponent } from './tour-list/tour-list.component';

const ENTRY_COMPONENTS = [
  TourUpsertComponent,
  BlockUpsertComponent,
  TourBuyersComponent,
  TourPassengersComponent,
  TourReportsComponent,
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  TourComponent,
  AgencyTourListComponent,
  TourListComponent
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
