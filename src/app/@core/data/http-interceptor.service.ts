import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, ErrorObserver, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((ev: HttpEvent<any>) => {
            // check all http request
          },
          response => {
            return throwError(response);
          }
        )
      );
  }

}
