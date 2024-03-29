import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtAuth: JwtAuthService,
    private snack: MatSnackBar
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    var user = this.jwtAuth.getUser();

    if (
      user &&
      route.data &&
      route.data['roles'] &&
      route.data['roles'].includes(user.role)
    ) {
      return true;
    } else {
      this.snack.open('You do not have access to this page!', 'OK');
      return false;
    }
  }
}
