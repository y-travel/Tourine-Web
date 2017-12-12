import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { StateService } from '../../@core/data/state.service';
import { SidebarService } from "../components/sidebar/sidebar.service";
import { ThemeService } from "../../@core/utils/theme.service";
import { MenuService } from "../components/menu/menu.service";
import { SpinnerService } from "../../@core/utils/spinner.service";

// TODO: move layouts into the framework
@Component({
  selector: 'trh-sample-layout',
  styleUrls: ['tourine.layout.scss'],
  template: `
    <trh-layout  >
      <div class="layout-header" fixed>
        <trh-header position="inverse"></trh-header>
      </div>

      <trh-sidebar class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   right="true">
        <div class="sidebar-header">
          <a href="#" class="btn btn-hero-success main-btn">
            <i class="nb-keypad"></i>
          </a>
        </div>
        <ng-content select="trh-menu"></ng-content>
      </trh-sidebar>

      <div class="layout-content main-content">
        <ng-content select="router-outlet"></ng-content>
      </div>
    </trh-layout>
  `,
})
export class TourineLayoutComponent implements OnDestroy {

  layout: any = {};
  sidebar: any = {};

  protected afterViewInit$ = new BehaviorSubject(null);
  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;
  private appendClassSubscription: Subscription;
  private themeSubscription: Subscription;
  private removeClassSubscription: Subscription;

  constructor(protected stateService: StateService,
              protected spinnerService:SpinnerService,
              protected menuService: MenuService,
              protected themeService: ThemeService,
              protected sidebarService: SidebarService,
              protected renderer:Renderer2,
              protected elementRef:ElementRef) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });
    this.themeSubscription = this.themeService.onThemeChange().subscribe((theme) => {

      const body = document.getElementsByTagName('body')[0];
      if (theme.previous) {
        this.renderer.removeClass(body, `trh-theme-${theme.previous}`);
      }
      this.renderer.addClass(body, `trh-theme-${theme.name}`);
    });

    this.appendClassSubscription = this.themeService.onAppendLayoutClass().subscribe((className) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });

    this.removeClassSubscription = this.themeService.onRemoveLayoutClass().subscribe((className) => {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    });

    this.spinnerService.registerLoader(new Promise((resolve, reject) => {
      this.afterViewInit$.subscribe((_) => resolve());
    }));
    this.spinnerService.load();

    // trigger first time so that after the change we have the initial value
    this.themeService.changeWindowWidth(window.innerWidth);
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
    this.menuClick$.unsubscribe();
  }
}
