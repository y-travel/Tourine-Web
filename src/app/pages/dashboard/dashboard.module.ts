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
import { TourModule } from '../tour/tour.module';
import { UserModule } from '../user/user.module';
import { PersonModule } from '../person/person.module';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';

const DASHBOARD_COMPONENTS = [
  DashboardComponent,
];
// we use these modules to prevent cross module definition
// cos we hope in future angular support lazy component
const TEMP_MODULES = [
  PersonModule,
  UserModule,
  TourModule,
];

@NgModule({
  imports: [
    ...COMMON_MODULES,
    ...TEMP_MODULES,
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ],
})
export class DashboardModule {
}

