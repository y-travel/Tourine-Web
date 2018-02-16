import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./@core/utils/auth.service";

@Injectable()
export class RouterGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService) {
  }

  checkLogin(url: string) {
    if (this.authService.isAuthenticated())
      return true;
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): boolean {
    return this.checkLogin(`/${route.path}`);
  }
}

