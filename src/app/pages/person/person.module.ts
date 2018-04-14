import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { PersonRoutingModule, routedComponents } from './person-routing.module';
import { COMMON_MODULES } from '../default';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { PersonService } from '../../@core/data/person.service';
import { DialogService } from '../../@core/utils/dialog.service';
import { LeaderUpsertComponent } from './leader-upsert/leader-upsert.component';

const COMPONENTS = [
  PersonComponent,
  LeaderUpsertComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    TrnAgGridModule.withAgModule(),
    PersonRoutingModule,
  ],
  declarations: [...routedComponents, ...COMPONENTS],
  providers: [DialogService, PersonService],
  entryComponents: COMPONENTS
})
export class PersonModule {
}
