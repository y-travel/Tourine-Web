import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from "./sidebar.service";
import { MatSidenav } from "@angular/material";

@Component({
  selector: 'trn-sidebar',
  templateUrl: './trn-sidebar.component.html',
  styleUrls: ['./trn-sidebar.component.scss']
})
export class TrnSidebarComponent implements OnInit {

  @ViewChild(MatSidenav) sidnav: MatSidenav;

  constructor(public sidebarService: SidebarService) {
    this.sidebarService.toggleChange.subscribe(res => this.sidnav.toggle());
  }

  ngOnInit() {
  }
}
