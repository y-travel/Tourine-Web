import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StateService {

  protected layouts: any = [
    {
      name: 'One Column',
      icon: 'nb-layout-default',
      id: 'one-column',
      selected: true,
    },
    {
      name: 'Two Column',
      icon: 'nb-layout-two-column',
      id: 'two-column',
    },
    {
      name: 'Center Column',
      icon: 'nb-layout-centre',
      id: 'center-column',
    },
  ];
  protected layoutState$ = new BehaviorSubject(this.layouts[0]);
  protected sidebars: any = [
    {
      name: 'Left Sidebar',
      icon: 'nb-layout-sidebar-left',
      id: 'left',
      selected: true,
    },
    {
      name: 'Right Sidebar',
      icon: 'nb-layout-sidebar-right',
      id: 'right',
    },
  ];
  protected sidebarState$ = new BehaviorSubject(this.sidebars[0]);

  setLayoutState(state: any): any {
    this.layoutState$.next(state);
  }

  getLayoutStates(): Observable<any[]> {
    return observableOf(this.layouts);
  }

  onLayoutState(): Observable<any> {
    return this.layoutState$.asObservable();
  }

  setSidebarState(state: any): any {
    this.sidebarState$.next(state);
  }

  getSidebarStates(): Observable<any[]> {
    return observableOf(this.sidebars);
  }

  onSidebarState(): Observable<any> {
    return this.sidebarState$.asObservable();
  }
}
