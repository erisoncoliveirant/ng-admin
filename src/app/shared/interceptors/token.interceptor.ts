import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtAuthService } from '../services/auth/jwt-auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwtAuth: JwtAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.jwtAuth.token || this.jwtAuth.getJwtToken();

    var changeReq;

    if (token) {
      changeReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      changeReq = req;
    }

    return next.handle(changeReq);
  }
}
