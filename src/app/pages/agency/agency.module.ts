import { NgModule } from '@angular/core';
import { AgencyUpsertComponent } from '../tour/agency-upsert/agency-upsert.component';
import { COMMON_MODULES } from '../default';

const ENTRY_COMPONENTS = [
  AgencyUpsertComponent,
];
const COMPONENTS = [
  ...ENTRY_COMPONENTS,
]

@NgModule({
  imports: [
    COMMON_MODULES,
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
})
export class AgencyModule {
}
