import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { COMMON_MODULES } from '../default';

const DASHBOARD_COMPONENTS = [
  DashboardComponent,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ],
})
export class DashboardModule {
}
