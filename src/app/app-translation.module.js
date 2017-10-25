"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var http_1 = require("@angular/common/http");
function TranslationHttpFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
exports.TranslationHttpFactory = TranslationHttpFactory;
var AppTranslationModule = /** @class */ (function () {
    function AppTranslationModule(translateService) {
        translateService.setDefaultLang("fa");
        translateService.use("fa");
    }
    AppTranslationModule = __decorate([
        core_1.NgModule({
            imports: [
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: TranslationHttpFactory,
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            exports: [
                core_2.TranslateModule
            ],
            providers: [
                core_2.TranslateService
            ]
        })
    ], AppTranslationModule);
    return AppTranslationModule;
}());
exports.AppTranslationModule = AppTranslationModule;
