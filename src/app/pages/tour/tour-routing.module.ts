import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TourListComponent } from './tour-list/tour-list.component';
import { TourComponent } from './tour.component';

const routes: Routes = [{
  path: '',
  component: TourComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: TourListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourRoutingModule {
}
