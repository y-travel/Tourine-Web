import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourListComponent } from "./tour-list/tour-list.component";
import { TourComponent } from "./tour.component";

const routes: Routes = [{
  path: '',
  component: TourComponent,
  children: [{
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

export const routedComponents = [
  TourComponent,
  TourListComponent,
];
