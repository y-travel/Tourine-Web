import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { commonModules } from "../default";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  imports: [
    ...commonModules,
    UserRoutingModule,

  ],
  declarations: [LoginComponent]
})
export class UserModule {
}
