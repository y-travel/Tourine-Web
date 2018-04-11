import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from "rxjs/operators";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((ev: HttpEvent<any>) => {
            console.log(ev);
          },
          response => {
            if (response instanceof HttpErrorResponse) {
            }
            return Observable.throw(response);
          }
        )
      );
  }

}
