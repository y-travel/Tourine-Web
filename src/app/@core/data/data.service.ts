import { Injectable } from "@angular/core";
import {
    Http,
    Response,
    Request,
    RequestMethod,
    RequestOptionsArgs,
    RequestOptions,
    URLSearchParams
} from "@angular/http";
import { Observable, Subject } from "rxjs/Rx";
//
import { ResponseStatus } from "../data/models/index";
import { Serializable } from "../utils/serializable";
import { RestError, RestErrorType } from "../utils/rest-error";

@Injectable()
export class DataService {
    response: Response;
    exception: any;
    error = new ResponseStatus();
    baseAddress = "";
    onError = new Subject<RestError>();
    onComplete = new Subject<Response>();
    onException = new Subject<any>();
    onRequest = new Subject();

    constructor(private http: Http) {
    }

    get(url: string, options?: RequestOptionsArgs, body?: string): Observable<Response> {
        return this.request(RequestMethod.Get, url, body, options);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Post, url, body, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Put, url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Delete, url, null, options);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Patch, url, body, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Head, url, null, options);
    }

    request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.baseAddress + url;
        if (!this.hasBody(method) && options)
            options.params = this.getQueryString(JSON.parse(body));
        this.onRequest.next();
        return Observable.create((observer) => {
            this.http.request(new Request(new RequestOptions(options).merge({method: method, url: url, body: body})))
                .map((response: Response) => response.json())
                .subscribe(res => {
                        this.onComplete.next(res);
                        observer.next(res);
                        observer.complete();
                    },
                    err => {
                        this.handleError(err);
                        observer.error(err);
                    }
                );
        });
    }

    getQueryString(body: {}): URLSearchParams {
        const params = new URLSearchParams();

        for (let k in body) {
            if (body.hasOwnProperty(k)) {
                params.set(k, body[k]);
            }
        }
        return params;
    }

    private hasBody(method: RequestMethod) {
        return !(method === RequestMethod.Get || method === RequestMethod.Delete || method === RequestMethod.Head);
    }

    private handleError(error: Response | any) {
        // we can use a remote logging infrastructure
        if (error instanceof Response) {
            this.response = error;

            try {
                const solvedError = error.json();
                if (solvedError.ResponseStatus)
                    this.setError(solvedError.ResponseStatus);
                else
                    this.setException(solvedError);

            } catch (e) {
                this.setException(error.text());
            }

        } else
            this.setException(error);

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
