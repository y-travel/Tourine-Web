import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'trn-pages',
  template: `
    <tourine-layout>
      <trn-menu [items]="menu"></trn-menu>
      <router-outlet></router-outlet>
    </tourine-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
