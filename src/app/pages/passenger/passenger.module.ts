import { NgModule } from '@angular/core';

import { PassengerReplacementComponent } from './passenger-replacement/passenger-replacement.component';
import { PassengerUpsertComponent } from './passenger-upsert/passenger-upsert.component';
import { PassengerRegisterComponent } from './passenger-register/passenger-register.component';
import { COMMON_MODULES } from '../default';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';
import { TrnAgGridModule } from '../../shared/trn-ag-grid/trn-ag-grid.module';

const ENTRY_COMPONENTS = [
  PassengerRegisterComponent,
  PassengerUpsertComponent,
  PassengerReplacementComponent,
];
const COMPONENTS = [
  ...ENTRY_COMPONENTS,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    SharedComponentsModule,
    TrnAgGridModule.withAgModule(),
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
})
export class PassengerModule {
}
