import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'trh-pages',
  template: `
    <trh-sample-layout>
      <trh-menu [items]="menu"></trh-menu>
      <router-outlet></router-outlet>
    </trh-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
