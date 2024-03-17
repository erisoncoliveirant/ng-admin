import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtAuthService } from '../services/auth/jwt-auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.jwtAuth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/sessions/signin'], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
    }
  }
}
