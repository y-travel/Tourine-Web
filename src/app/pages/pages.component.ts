import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'trn-pages',
  template: `
    <trn-tourine-layout>
      <trn-menu [items]="menu"></trn-menu>
      <router-outlet></router-outlet>
    </trn-tourine-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
