import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from "./sidebar.service";
import { MatSidenav } from "@angular/material";

@Component({
  selector: 'trh-sidebar',
  templateUrl: './trh-sidebar.component.html',
  styleUrls: ['./trh-sidebar.component.scss']
})
export class TrhSidebarComponent implements OnInit {

  @ViewChild(MatSidenav) sidnav: MatSidenav;

  constructor(public sidebarService: SidebarService) {
    this.sidebarService.toggleChange.subscribe(res => this.sidnav.toggle());
  }

  ngOnInit() {
  }
}
