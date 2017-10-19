import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
//
import { Serializable } from "../utils/serializable";
import { QueryResponse, IReturn } from "./models/index";
import { Configuration } from "../utils/configuration";
import { Helper } from "../utils";

@Injectable()
export class ApiService {
    private headers: Headers;

    constructor(public dataService: DataService) {
        dataService.baseAddress = Configuration.ApiUrl + "json/reply/";
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }

    getEntities<T>(data: IReturn<QueryResponse<T>>): Observable<QueryResponse<T>> {

        return this.internalSend(data);
    }

    // protected saveEntity<T>(data: IReturn<EntityCreatedResponse<T>>): Observable<EntityCreatedResponse<T>> {
    //     return this.internalSend(data);
    // }

    get<T>(data: IReturn<T>): Observable<T> {

        return this.internalSend(data);
    }

    send<T>(data: IReturn<T>): Observable<T> {
        return this.internalSend(data);
    }

    private internalSend<T>(data: IReturn<T>): Observable<T> {
        const httpMethod = Helper.getHttpMethod(data);
        let requestMethod = RequestMethod.Get;
        switch (httpMethod) {
            case "POST":
                requestMethod = RequestMethod.Post;
                break;
            case "PUT":
                requestMethod = RequestMethod.Put;
                break;
        }


        return this.dataService.request(requestMethod, data.getTypeName(), Serializable.toJSON(data), new RequestOptions({headers: this.headers})).map(
            res => {
                const type = data.createResponse();
                if (type)
                    return Serializable.fromJSON(type, res);
                return res;
            });
    }

}
