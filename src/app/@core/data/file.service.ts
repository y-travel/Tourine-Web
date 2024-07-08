import { Inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { Serializable } from '../utils/serializable';
import { IReturn } from './models/index';
import { APP_CONFIG, AppConfig } from '../utils/app.config';
import { AppUtils, UTILS } from '../utils';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpMethod } from './models/enums';

@Injectable()
export class FileService extends DataService {

  constructor(@Inject(APP_CONFIG) config: AppConfig,
              @Inject(UTILS) private utils: AppUtils,
              http: HttpClient) {
    super(http);
    this.baseAddress = config.ApiUrl + 'json/reply/';
  }

  get<T>(data: IReturn<T>): Observable<T> {
    return this.internalSend(data);
  }

  protected createRequest(method: HttpMethod, url: string, body: string, httpParams: any) {
    return this.http.request(method, url, {body: body, observe: 'response', headers: this.headers, params: httpParams, responseType: 'blob'})
      .pipe(map((response: HttpResponse<any>) => response.body));
  }

  private internalSend<T>(data: IReturn<T>): Observable<T | any> {
    return this.request(this.utils.getHttpMethod(data), data.getTypeName(), Serializable.toJSON(data));
  }
}
