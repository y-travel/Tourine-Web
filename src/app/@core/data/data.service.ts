import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
//
import { ResponseStatus } from '../data/models/index';
import { HttpMethod } from './models/enums';


@Injectable()
export class DataService {
  response: HttpResponse<any>;
  error = new ResponseStatus();
  baseAddress = '';
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
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      }));
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

}
