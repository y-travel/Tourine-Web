"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_smart_table_1 = require("ng2-smart-table");
var theme_module_1 = require("../../@theme/theme.module");
var tour_service_1 = require("../../@core/data/tour.service");
var tour_routing_module_1 = require("./tour-routing.module");
var api_service_1 = require("../../@core/data/api.service");
var data_service_1 = require("../../@core/data/data.service");
var tour_upsert_component_1 = require("./tour-upsert.component");
var app_translation_module_1 = require("../../app-translation.module");
var tourComponents = [
    tour_upsert_component_1.TourUpsertComponent
];
var TourModule = /** @class */ (function () {
    function TourModule() {
    }
    TourModule = __decorate([
        core_1.NgModule({
            imports: [
                theme_module_1.ThemeModule,
                tour_routing_module_1.TourRoutingModule,
                ng2_smart_table_1.Ng2SmartTableModule,
                app_translation_module_1.AppTranslationModule,
            ],
            declarations: tourComponents.concat(tour_routing_module_1.routedComponents),
            providers: [
                tour_service_1.TourService,
                api_service_1.ApiService,
                data_service_1.DataService,
            ],
            entryComponents: [
                tour_upsert_component_1.TourUpsertComponent
            ]
        })
    ], TourModule);
    return TourModule;
}());
exports.TourModule = TourModule;
