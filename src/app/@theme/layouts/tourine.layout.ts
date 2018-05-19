import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StateService } from '../../@core/data/state.service';
import { SidebarService } from '../components/sidebar/sidebar.service';
import { ThemeService } from '../../@core/utils/theme.service';
import { MenuService } from '../components/menu/menu.service';
import { SpinnerService } from '../../@core/utils/spinner.service';

declare type LayoutType = 'layout1' | 'layout2';

// TODO: move layouts into the framework
@Component({
  selector: 'trn-tourine-layout',
  templateUrl: 'tourine.layout.html',
  styleUrls: ['tourine.layout.scss'],
})
export class TourineLayoutComponent implements OnDestroy, OnInit {
  layout: any = {};
  sidebar: any = {};
  @Input() layoutType: LayoutType = 'layout1';
  protected afterViewInit$ = new BehaviorSubject(null);
  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  private appendClassSubscription: Subscription;
  private themeSubscription: Subscription;
  private removeClassSubscription: Subscription;

  constructor(protected stateService: StateService,
              protected spinnerService: SpinnerService,
              protected menuService: MenuService,
              protected themeService: ThemeService,
              protected sidebarService: SidebarService,
              protected renderer: Renderer2,
              protected elementRef: ElementRef) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });
    this.themeSubscription = this.themeService.onThemeChange().subscribe((theme) => {

      const body = document.getElementsByTagName('body')[0];
      if (theme.previous) {
        this.renderer.removeClass(body, `trn-theme-${theme.previous}`);
      }
      this.renderer.addClass(body, `trn-theme-${theme.name}`);
    });

    this.appendClassSubscription = this.themeService.onAppendLayoutClass().subscribe((className) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });

    this.removeClassSubscription = this.themeService.onRemoveLayoutClass().subscribe((className) => {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    });
    this.spinnerService.load();
    this.menuService.onClick.subscribe(res => this.sidebarService.toggle(false));
    // trigger first time so that after the change we have the initial value
    this.themeService.changeWindowWidth(window.innerWidth);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
  }
}
