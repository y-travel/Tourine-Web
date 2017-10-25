"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
//
var index_1 = require("../data/models/index");
var serializable_1 = require("../utils/serializable");
var rest_error_1 = require("../utils/rest-error");
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.error = new index_1.ResponseStatus();
        this.baseAddress = "";
        this.onError = new Rx_1.Subject();
        this.onComplete = new Rx_1.Subject();
        this.onException = new Rx_1.Subject();
        this.onRequest = new Rx_1.Subject();
    }
    DataService.prototype.get = function (url, options, body) {
        return this.request(http_1.RequestMethod.Get, url, body, options);
    };
    DataService.prototype.post = function (url, body, options) {
        return this.request(http_1.RequestMethod.Post, url, body, options);
    };
    DataService.prototype.put = function (url, body, options) {
        return this.request(http_1.RequestMethod.Put, url, body, options);
    };
    DataService.prototype.delete = function (url, options) {
        return this.request(http_1.RequestMethod.Delete, url, null, options);
    };
    DataService.prototype.patch = function (url, body, options) {
        return this.request(http_1.RequestMethod.Patch, url, body, options);
    };
    DataService.prototype.head = function (url, options) {
        return this.request(http_1.RequestMethod.Head, url, null, options);
    };
    DataService.prototype.request = function (method, url, body, options) {
        var _this = this;
        url = this.baseAddress + url;
        if (!this.hasBody(method) && options)
            options.params = this.getQueryString(JSON.parse(body));
        this.onRequest.next();
        return Rx_1.Observable.create(function (observer) {
            _this.http.request(new http_1.Request(new http_1.RequestOptions(options).merge({ method: method, url: url, body: body })))
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                _this.onComplete.next(res);
                observer.next(res);
                observer.complete();
            }, function (err) {
                _this.handleError(err);
                observer.error(err);
            });
        });
    };
    DataService.prototype.getQueryString = function (body) {
        var params = new http_1.URLSearchParams();
        for (var k in body) {
            if (body.hasOwnProperty(k)) {
                params.set(k, body[k]);
            }
        }
        return params;
    };
    DataService.prototype.hasBody = function (method) {
        return !(method === http_1.RequestMethod.Get || method === http_1.RequestMethod.Delete || method === http_1.RequestMethod.Head);
    };
    DataService.prototype.handleError = function (error) {
        // we can use a remote logging infrastructure
        if (error instanceof http_1.Response) {
            this.response = error;
            try {
                var solvedError = error.json();
                if (solvedError.ResponseStatus)
                    this.setError(solvedError.ResponseStatus);
                else
                    this.setException(solvedError);
            }
            catch (e) {
                this.setException(error.text());
            }
        }
        else
            this.setException(error);
    };
    DataService.prototype.setException = function (exception) {
        this.exception = exception;
        this.onException.next(this.exception);
    };
    DataService.prototype.setError = function (error) {
        serializable_1.Serializable.clone(this.error, error);
        var restError = new rest_error_1.RestError(error, (this.response.status === 422) ? rest_error_1.RestErrorType.Validation : rest_error_1.RestErrorType.Other);
        this.onError.next(restError);
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
