import { NgModule } from '@angular/core';

import { ROUTED_COMPONENTS, TourRoutingModule } from './tour-routing.module';
import { TourUpsertComponent } from './tour-upsert/tour-upsert.component';
import { EditPasswordComponent } from './edit-password.component';
import { DialogService } from '../../@core/utils/dialog.service';
import { COMMON_MODULES } from '../default';
import { TourGridService } from './tour-grid.service';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { AgencyUpsertComponent } from './agency-upsert/agency-upsert.component';
import { BlockUpsertComponent } from './block-upsert/block-upsert.component';
import { PassengerUpsertComponent } from './passenger-upsert/passenger-upsert.component';
import { PassengerGridService } from './passenger-grid.service';
import { TeamMemberUpsertComponent } from './team-member-upsert/team-member-upsert.component';
import { PersonService } from './person.service';
import { BlockListComponent } from './block-list/block-list.component';
import { BlocksGridService } from './blocks-grid.service';

const ENTRY_COMPONENTS = [
  TourUpsertComponent,
  EditPasswordComponent,
  AgencyUpsertComponent,
  BlockUpsertComponent,
  PassengerUpsertComponent,
  TeamMemberUpsertComponent,
  BlockListComponent,
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
    PassengerUpsertComponent,
    TeamMemberUpsertComponent,
    BlockListComponent,
  ],
  providers: [DialogService, TourGridService, PassengerGridService, PersonService,BlocksGridService],
  entryComponents: ENTRY_COMPONENTS
})
export class TourModule {
}
