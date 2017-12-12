import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { ThemeService } from "../../../@core/utils/theme.service";

@Component({
  selector: 'trh-theme-switcher',
  styleUrls: ['./theme-switcher.component.scss'],
  template: `
    <label class="theme-switch">
      <span class="light nb-sunny"></span>
      <div class="switch">
        <input type="checkbox" [checked]="isDark" (change)="toggleTheme(theme.checked)" #theme>
        <span class="slider"></span>
      </div>
      <span class="cosmic nb-star"></span>
    </label>
  `,
})
export class ThemeSwitcherComponent implements OnInit {

  isDark: boolean;

  constructor(private themeService: ThemeService, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
  }

  toggleTheme(value: boolean) {
    this.isDark = value;
    this.themeService.changeTheme(this.isDark ? "cosmic" : "default");
  }
}
