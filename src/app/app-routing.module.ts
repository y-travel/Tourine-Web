import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterGuard } from './app-router-guard';

const routes: Routes = [
  {
    path: 'pages',
    canLoad: [RouterGuard],
    canActivateChild: [RouterGuard],
    canActivate: [RouterGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  {path: 'user', loadChildren: './pages/user/user.module#UserModule'},
  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: '**', redirectTo: 'user'},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [RouterGuard],
})
export class AppRoutingModule {
}
