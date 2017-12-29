import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { SidebarService } from "../sidebar/sidebar.service";
import { MenuService } from "../menu/menu.service";

@Component({
  selector: 'trh-header',
  styleUrls: ['./trh-header.component.scss'],
  templateUrl: './trh-header.component.html',
})
export class TrhHeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: SidebarService,
              private menuService: MenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true);
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false);
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
