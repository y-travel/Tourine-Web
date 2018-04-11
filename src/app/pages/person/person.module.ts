import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { routedComponents, PersonRoutingModule } from './person-routing.module';
import { COMMON_MODULES } from '../default';
import { LeaderListComponent } from './leader-list/leader-list.component';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';
import { PersonService } from '../../@core/data/person.service';
import { LeaderGridService } from './leader-grid.service';
import { DialogService } from '../../@core/utils/dialog.service';
import { LeaderUpsertComponent } from './leader-upsert/leader-upsert.component';

const COMPONENTS =[
  PersonComponent,
  LeaderUpsertComponent,
];
@NgModule({
  imports: [
    ...COMMON_MODULES,
    TrnAgGridModule.withAgModule(),
    PersonRoutingModule,
  ],
  declarations: [...routedComponents,...COMPONENTS],
  providers: [DialogService,PersonService,LeaderGridService],
  entryComponents: COMPONENTS
})
export class PersonModule { }
