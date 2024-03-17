import { BehaviorSubject, catchError, delay, map, of, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { LocalStoreService } from '../local-store.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

const DEMO_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed';

const DEMO_USER: User = {
  id: '5b700c45639d2c0c54b354ba',
  displayName: 'Erison Neto',
  role: 'SA',
};

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  token: any;
  isAuthenticated: any;
  user: User = {};
  user$ = new BehaviorSubject<User>(this.user);
  signingIn: any;
  return: any;
  JWT_TOKEN = 'JWT_TOKEN';
  APP_USER = 'MATX_USER';

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  public signin(username: string, password: string) {
    return of({ token: DEMO_TOKEN, user: DEMO_USER }).pipe(
      delay(1000),
      map((res: any) => {
        this.setUserAndToken(res.token, res.user, !!res);
        this.signingIn = false;
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER

    // this.signingIn = true;
    // return this.http.post(`${environment.apiURL}/auth/local`, { username, password })
    //   .pipe(
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    return of(DEMO_USER).pipe(
      map((profile: User) => {
        this.setUserAndToken(this.getJwtToken(), profile, true);
        this.signingIn = false;
        return profile;
      }),
      catchError((error) => {
        return of(error);
      })
    );

    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */

    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  public signout() {
    this.setUserAndToken('', {}, false);
    this.router.navigateByUrl('sessions/signin');
  }

  isLoggedIn(): any {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }
}
