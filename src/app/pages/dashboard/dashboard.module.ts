import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { commonModules } from "../default";

const DASHBOARD_COMPONENTS = [
  DashboardComponent,
];

@NgModule({
  imports: [
    ...commonModules,
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ],
})
export class DashboardModule {
}
