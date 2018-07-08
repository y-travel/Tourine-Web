import { NgModule } from '@angular/core';

import { ROUTED_COMPONENTS, TourRoutingModule } from './tour-routing.module';
import { TourUpsertComponent } from './tour-upsert/tour-upsert.component';
import { DialogService } from '../../@core/utils/dialog.service';
import { COMMON_MODULES } from '../default';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { AgencyUpsertComponent } from './agency-upsert/agency-upsert.component';
import { BlockUpsertComponent } from './block-upsert/block-upsert.component';
import { PassengerRegisterComponent } from './passenger-register/passenger-register.component';
import { PassengerUpsertComponent } from './passenger-upsert/passenger-upsert.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { TourPassengersComponent } from './tour-passengers/tour-passengers.component';
import { PassengerReplacementComponent } from './passenger-replacement/passenger-replacement.component';
import { PassengerReplacementTourGridService } from './passenger-replacement/passenger-replacement-tour-grid.service';
import { TourReportsComponent } from './tour-reports/tour-reports.component';
import { TourReportGridService } from './tour-reports/tour-reports.service';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';

const ENTRY_COMPONENTS = [
  TourUpsertComponent,
  AgencyUpsertComponent,
  BlockUpsertComponent,
  PassengerRegisterComponent,
  PassengerUpsertComponent,
  BuyerListComponent,
  TourPassengersComponent,
  PassengerReplacementComponent,
  TourReportsComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    TourRoutingModule,
    TrnAgGridModule.withAgModule(),
    SharedComponentsModule,
  ],
  declarations: [
    ...ENTRY_COMPONENTS,
    ...ROUTED_COMPONENTS,
    PassengerRegisterComponent,
    PassengerUpsertComponent,
    BuyerListComponent,
    TourPassengersComponent,
    PassengerReplacementComponent,
    TourReportsComponent,
  ],
  providers: [
    DialogService,
    PassengerReplacementTourGridService,
    TourReportGridService,
  ],
  entryComponents: ENTRY_COMPONENTS
})
export class TourModule {
}
