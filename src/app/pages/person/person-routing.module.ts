import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderUpsertComponent } from './leader-upsert/leader-upsert.component';
import { PersonComponent } from './person.component';
import { LeaderListComponent } from './leader-list/leader-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children: [
      {
        path: 'leader/list',
        component: LeaderListComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {
}

export const routedComponents = [

  LeaderListComponent,
];
