import { NgModule } from '@angular/core';
import { ToasterModule } from "angular2-toaster";

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AppTranslationModule } from "../../app-translation.module";

const DASHBOARD_COMPONENTS = [
  DashboardComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule,
    AppTranslationModule
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ],
})
export class DashboardModule {
}
