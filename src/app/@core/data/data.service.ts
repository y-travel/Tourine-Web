import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
//
import { ResponseStatus } from '../data/models/index';
import { Serializable } from '../utils/serializable';
import { RestError, RestErrorType } from '../utils/rest-error';
import { HttpMethod } from './models/enums';


@Injectable()
export class DataService {
  response: HttpResponse<any>;
  exception: any;
  error = new ResponseStatus();
  baseAddress = '';
  onError = new Subject<RestError>();
  onComplete = new Subject<HttpResponse<any>>();
  onException = new Subject<any>();
  onRequest = new Subject();
  headers: HttpHeaders;

  private spinnerService: any = {}; // @TODO implement
  constructor(public http: HttpClient) {
  }

  request(method: HttpMethod, url: string, body?: string): Observable<HttpResponse<any> | any> {
    url = this.baseAddress + url;
    const httpParams = !this.hasBody(method) ? this.getQueryString(JSON.parse(body)) : undefined;
    // this.spinnerService.start();
    this.onRequest.next();
    return this.createRequest(method, url, body, httpParams);
  }

  protected createRequest(method: HttpMethod, url: string, body: string, httpParams: any) {
    return this.http.request(method, url, {body: body, observe: 'response', headers: this.headers, params: httpParams, responseType: 'json'})
      .map((response: HttpResponse<any>) => {
        return response.body;
      });
  }

  private getQueryString(body: any): HttpParams {
    let params = new HttpParams();

    for (const k in body) {
      if (body.hasOwnProperty(k)) {
        params = params.append(k, body[k]);
      }
    }
    return params;
  }

  private hasBody(method: HttpMethod) {
    return !(method === 'GET' || method === 'DELETE' || method === 'HEAD');
  }

  private handleError(error: HttpResponse<any> | any) {
    // we can use a remote logging infrastructure
    if (error instanceof HttpResponse) {
      this.response = error;

      try {
        const solvedError = error.body;
        if (solvedError.ResponseStatus) {
          this.setError(solvedError.ResponseStatus);
        } else {
          this.setException(solvedError);
        }

      } catch (e) {
        this.setException(error.body);
      }

    } else {
      this.setException(error);
    }

  }

  private setException(exception) {
    this.exception = exception;
    this.onException.next(this.exception);
  }

  private setError(error: ResponseStatus) {
    Serializable.clone(this.error, error);
    const restError = new RestError(error, (this.response.status === 422) ? RestErrorType.Validation : RestErrorType.Other);
    this.onError.next(restError);
  }
}
