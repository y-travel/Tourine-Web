import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class ThemeService {
  // TODO: behavioral subject here?
  currentTheme: string;
  private themeChanges$ = new ReplaySubject(1);
  private appendToLayoutTop$ = new ReplaySubject();
  private createLayoutTop$ = new Subject();
  private appendLayoutClass$ = new Subject();
  private removeLayoutClass$ = new Subject();
  private changeWindowWidth$ = new ReplaySubject<number>(2);

  constructor() {
    this.changeTheme('default'); //@TODO define in provider
  }

  changeTheme(name: string): void {
    this.themeChanges$.next({name, previous: this.currentTheme});
    this.currentTheme = name;
  }

  changeWindowWidth(width: number): void {
    this.changeWindowWidth$.next(width);
  }

  appendToLayoutTop<T>(component: Type<T>): Observable<any> {
    const subject = new ReplaySubject(1);
    this.appendToLayoutTop$.next({component, listener: subject});
    return subject.asObservable();
  }

  clearLayoutTop(): Observable<any> {
    const observable = new BehaviorSubject(null);
    this.createLayoutTop$.next({listener: observable});
    this.appendToLayoutTop$ = new ReplaySubject();
    return observable.asObservable();
  }

  onThemeChange(): Observable<any> {
    return this.themeChanges$.pipe(share());
  }

  onAppendToTop(): Observable<any> {
    return this.appendToLayoutTop$.pipe(share());
  }

  onClearLayoutTop(): Observable<any> {
    return this.createLayoutTop$.pipe(share());
  }

  appendLayoutClass(className: string) {
    this.appendLayoutClass$.next(className);
  }

  onAppendLayoutClass(): Observable<any> {
    return this.appendLayoutClass$.pipe(share());
  }

  removeLayoutClass(className: string) {
    this.removeLayoutClass$.next(className);
  }

  onRemoveLayoutClass(): Observable<any> {
    return this.removeLayoutClass$.pipe(share());
  }
}
