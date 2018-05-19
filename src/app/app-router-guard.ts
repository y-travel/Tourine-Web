import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './@core/utils/auth.service';

@Injectable()
export class RouterGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  checkLogin(url: string) {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.authService.authorize()
        .then(res => {
          if (res) {
            this.router.navigate([url]);
          } else {
            this.router.navigate(['/user/login']);
          }
        });
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLogin(`/${route.path}`);
  }
}

