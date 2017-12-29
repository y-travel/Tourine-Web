import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { MenuService } from "./menu.service";

@Component({
  selector: 'trh-menu',
  templateUrl: './trh-menu.component.html',
  styleUrls: ['./trh-menu.component.scss']
})
export class TrhMenuComponent {

  @Input() items = [];

  constructor(private router: Router,private menuService:MenuService) {
  }

  navigate(link: string) {
    this.router.navigate([link]);
    this.menuService.onClick.emit(link);
  }
}
