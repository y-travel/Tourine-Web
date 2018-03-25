import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { routedComponents, PersonRoutingModule } from './person-routing.module';
import { COMMON_MODULES } from '../default';
const COMPONENTS =[
  PersonComponent,
];
@NgModule({
  imports: [
    ...COMMON_MODULES,
    PersonRoutingModule,
  ],
  declarations: [...routedComponents,...COMPONENTS]
})
export class PersonModule { }
