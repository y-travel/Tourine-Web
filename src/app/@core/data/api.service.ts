import { Inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { Serializable } from '../utils/serializable';
import { IReturn } from './models/index';
import { APP_CONFIG, AppConfig } from '../utils/app.config';
import { AppUtils, UTILS } from '../utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryResponse } from './models/server.dtos';

@Injectable()
export class ApiService extends DataService {

  constructor(@Inject(APP_CONFIG) config: AppConfig,
              @Inject(UTILS) private utils: AppUtils,
              http: HttpClient) {
    super(http);
    this.baseAddress = config.ApiUrl + 'json/reply/';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  get<T>(data: IReturn<T>): Observable<T> {
    return this.internalSend(data);
  }

  send<T>(data: IReturn<T>): Observable<T> {
    return this.internalSend(data);
  }

  getEntities<T>(data: IReturn<QueryResponse<T>>): Observable<T[]> {
    return this.internalSend(data).pipe(map(res => res.results));
  }

  private internalSend<T>(data: IReturn<T>): Observable<T | any> {
    return this.request(this.utils.getHttpMethod(data), data.getTypeName(), Serializable.toJSON(data))
      .pipe(map(res => {
        const type = data.createResponse();
        if (type) {
          return Serializable.fromJSON(type, res);
        }
        return res;
      }));
  }
}
