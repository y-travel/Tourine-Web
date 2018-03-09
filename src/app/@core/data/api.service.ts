import { Inject, Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Observable } from "rxjs/Rx";
//
import { Serializable } from "../utils/serializable";
import { IReturn } from "./models/index";
import { APP_CONFIG, AppConfig } from "../utils/app.config";
import { Utils } from "../utils";
import { HttpHeaders } from "@angular/common/http";
import { QueryResponse } from "./models/server.dtos";

@Injectable()
export class ApiService {
  private headers: HttpHeaders;

  constructor(public dataService: DataService, @Inject(APP_CONFIG) config: AppConfig, private utils: Utils) {
    dataService.baseAddress = config.ApiUrl + "json/reply/";
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
  }

  get<T>(data: IReturn<T>): Observable<T> {

    return this.internalSend(data);
  }

  send<T>(data: IReturn<T>): Observable<T> {
    return this.internalSend(data);
  }

  getEntities<T>(data: IReturn<QueryResponse<T>>): Observable<T[]> {
    return this.internalSend(data).map(res => res.results);
  }

  //
  // protected saveEntity<T>(data: IReturn<EntityCreatedResponse<T>>): Observable<EntityCreatedResponse<T>> {
  //   return this.internalSend(data);
  // }

  private internalSend<T>(data: IReturn<T>): Observable<T | any> {
    return this.dataService
      .request(this.utils.getHttpMethod(data), data.getTypeName(), Serializable.toJSON(data), this.headers)
      .map(res => {
        const type = data.createResponse();
        if (type)
          return Serializable.fromJSON(type, res);
        return res;
      });
  }
}
