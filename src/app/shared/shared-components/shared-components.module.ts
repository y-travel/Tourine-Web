import { NgModule } from '@angular/core';

import { FindPersonComponent } from './find-person/find-person.component';
import { COMMON_MODULES } from '../../pages/default';

const COMPONENTS = [
  FindPersonComponent
];

@NgModule({
  imports: [...COMMON_MODULES],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class SharedComponentsModule {
}
