import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { PersonRoutingModule, routedComponents } from './person-routing.module';
import { COMMON_MODULES } from '../default';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { PersonService } from '../../@core/data/person.service';
import { DialogService } from '../../@core/utils/dialog.service';
import { PersonUpsertComponent } from './person-upsert/person-upsert.component';

const COMPONENTS = [
  PersonComponent,
  PersonUpsertComponent,
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
