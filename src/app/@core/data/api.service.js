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
//
var serializable_1 = require("../utils/serializable");
var configuration_1 = require("../utils/configuration");
var utils_1 = require("../utils");
var ApiService = /** @class */ (function () {
    function ApiService(dataService) {
        this.dataService = dataService;
        dataService.baseAddress = configuration_1.Configuration.ApiUrl + "json/reply/";
        this.headers = new http_1.Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }
    ApiService.prototype.getEntities = function (data) {
        return this.internalSend(data);
    };
    // protected saveEntity<T>(data: IReturn<EntityCreatedResponse<T>>): Observable<EntityCreatedResponse<T>> {
    //     return this.internalSend(data);
    // }
    ApiService.prototype.get = function (data) {
        return this.internalSend(data);
    };
    ApiService.prototype.send = function (data) {
        return this.internalSend(data);
    };
    ApiService.prototype.internalSend = function (data) {
        var httpMethod = utils_1.Helper.getHttpMethod(data);
        var requestMethod = http_1.RequestMethod.Get;
        switch (httpMethod) {
            case "POST":
                requestMethod = http_1.RequestMethod.Post;
                break;
            case "PUT":
                requestMethod = http_1.RequestMethod.Put;
                break;
        }
        return this.dataService.request(requestMethod, data.getTypeName(), serializable_1.Serializable.toJSON(data), new http_1.RequestOptions({ headers: this.headers })).map(function (res) {
            var type = data.createResponse();
            if (type)
                return serializable_1.Serializable.fromJSON(type, res);
            return res;
        });
    };
    ApiService = __decorate([
        core_1.Injectable()
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
