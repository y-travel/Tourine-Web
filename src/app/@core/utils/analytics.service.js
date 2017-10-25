"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var filter_1 = require("rxjs/operator/filter");
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(location, router) {
        this.location = location;
        this.router = router;
        this.enabled = false;
    }
    AnalyticsService.prototype.trackPageViews = function () {
        var _this = this;
        if (this.enabled) {
            filter_1.filter.call(this.router.events, function (event) { return event instanceof router_1.NavigationEnd; })
                .subscribe(function () {
                ga('send', { hitType: 'pageview', page: _this.location.path() });
            });
        }
    };
    AnalyticsService.prototype.trackEvent = function (eventName) {
        if (this.enabled) {
            ga('send', 'event', eventName);
        }
    };
    AnalyticsService = __decorate([
        core_1.Injectable()
    ], AnalyticsService);
    return AnalyticsService;
}());
exports.AnalyticsService = AnalyticsService;
