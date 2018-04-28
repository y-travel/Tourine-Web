/*
we can use this module to load other components dynamically for more information see:
https://blog.angularindepth.com/dynamically-loading-components-with-angular-cli-92a3c69bcd28
and
https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e
but in this case we force to redirect dashboard to tour list intentionally and in the future implement this
feature.
thanks for your attention!
 */
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

