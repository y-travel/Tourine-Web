import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'trh-menu',
  templateUrl: './trh-menu.component.html',
  styleUrls: ['./trh-menu.component.scss']
})
export class TrhMenuComponent {

  @Input() items = [];

  constructor(private router: Router) {
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }
}
