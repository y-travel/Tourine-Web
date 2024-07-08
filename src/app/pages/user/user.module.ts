import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { COMMON_MODULES } from '../default';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ThemeModule } from '../../@theme/theme.module';
import { AppTranslationModule } from '../../app-translation.module';
import { EditPasswordComponent } from './edit-password/edit-password.component';

const ENTRY_COMPONENTS = [
  EditPasswordComponent,
];
const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  LoginComponent,
  UserComponent,
  EditPasswordComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    AppTranslationModule,
    UserRoutingModule,
    ThemeModule,
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
})
export class UserModule {
}
