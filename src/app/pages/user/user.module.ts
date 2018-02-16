import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { commonModules } from "../default";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from './user.component';
import { ThemeModule } from "../../@theme/theme.module";

@NgModule({
  imports: [
    ...commonModules,
    UserRoutingModule,
    ThemeModule,
  ],
  declarations: [LoginComponent, UserComponent]
})
export class UserModule {
}
