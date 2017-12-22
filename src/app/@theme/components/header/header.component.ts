import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { SidebarService } from "../sidebar/sidebar.service";
import { MenuService } from "../menu/menu.service";

@Component({
  selector: 'trh-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


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
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
