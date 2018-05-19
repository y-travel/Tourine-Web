import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';

@Component({
  selector: 'trn-menu',
  templateUrl: './trn-menu.component.html',
  styleUrls: ['./trn-menu.component.scss']
})
export class TrnMenuComponent {

  @Input() items = [];

  constructor(private router: Router, private menuService: MenuService) {
  }

  navigate(link: string) {
    this.router.navigate([link]);
    this.menuService.onClick.emit(link);
  }
}
