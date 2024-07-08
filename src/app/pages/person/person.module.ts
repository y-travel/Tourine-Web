import { NgModule } from '@angular/core';

import { PersonComponent } from './person.component';
import { PersonRoutingModule } from './person-routing.module';
import { COMMON_MODULES } from '../default';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { PersonService } from '../../@core/data/person.service';
import { DialogService } from '../../@core/utils/dialog.service';
import { PersonUpsertComponent } from './person-upsert/person-upsert.component';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';
import { LeaderListComponent } from './leader-list/leader-list.component';

const ENTRY_COMPONENTS = [
  PersonUpsertComponent,
];

const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  PersonComponent,
  LeaderListComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    TrnAgGridModule.withAgModule(),
    PersonRoutingModule,
    SharedComponentsModule
  ],
  providers: [DialogService, PersonService],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
})
export class PersonModule {
}
