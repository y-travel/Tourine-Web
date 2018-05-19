import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { ThemeService } from '../../../@core/utils/theme.service';

@Component({
  selector: 'trn-theme-switcher',
  styleUrls: ['./trn-theme-switcher.component.scss'],
  templateUrl: 'trn-theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit {

  isDark: boolean;

  constructor(private themeService: ThemeService, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
  }

  toggleTheme(value: boolean) {
    this.isDark = value;
    this.themeService.changeTheme(this.isDark ? 'cosmic' : 'default');
  }
}
