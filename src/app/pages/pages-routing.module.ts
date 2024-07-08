import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'tour',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'tour',
      loadChildren: './tour/tour.module#TourModule',
    },
    {
      path: 'person',
      loadChildren: './person/person.module#PersonModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
