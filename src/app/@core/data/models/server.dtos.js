"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Options:
Date: 2017-10-20 02:03:38
Version: 4.514
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://www.tourine.ir/api

//GlobalNamespace:
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
ExcludeTypes: IReturn,IReturnVoid,Tour
DefaultImports: {IReturn,IReturnVoid}
*/
var client_model_1 = require("./client.model");
var QueryBase = /** @class */ (function () {
    function QueryBase() {
    }
    return QueryBase;
}());
exports.QueryBase = QueryBase;
var QueryDb = /** @class */ (function (_super) {
    __extends(QueryDb, _super);
    function QueryDb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueryDb;
}(QueryBase));
exports.QueryDb = QueryDb;
var TourInfo = /** @class */ (function () {
    function TourInfo() {
    }
    return TourInfo;
}());
exports.TourInfo = TourInfo;
// @DataContract
var ResponseError = /** @class */ (function () {
    function ResponseError() {
    }
    return ResponseError;
}());
exports.ResponseError = ResponseError;
// @DataContract
var ResponseStatus = /** @class */ (function () {
    function ResponseStatus() {
    }
    return ResponseStatus;
}());
exports.ResponseStatus = ResponseStatus;
// @DataContract
var QueryResponse = /** @class */ (function () {
    function QueryResponse() {
    }
    return QueryResponse;
}());
exports.QueryResponse = QueryResponse;
var GetTours = /** @class */ (function (_super) {
    __extends(GetTours, _super);
    function GetTours() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetTours.prototype.createResponse = function () { return new QueryResponse(); };
    GetTours.prototype.getTypeName = function () { return "GetTours"; };
    GetTours = __decorate([
        client_model_1.Route("/customer/tours", "GET")
    ], GetTours);
    return GetTours;
}(QueryDb));
exports.GetTours = GetTours;
