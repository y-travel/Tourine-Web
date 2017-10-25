"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ThemeSwitcherComponent = /** @class */ (function () {
    function ThemeSwitcherComponent(themeService, analyticsService) {
        this.themeService = themeService;
        this.analyticsService = analyticsService;
    }
    ThemeSwitcherComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.themeService.getJsTheme()
            .subscribe(function (theme) { return _this.theme = theme; });
    };
    ThemeSwitcherComponent.prototype.toggleTheme = function (theme) {
        var boolTheme = this.boolToTheme(theme);
        this.themeService.changeTheme(boolTheme);
        this.analyticsService.trackEvent('switchTheme');
    };
    ThemeSwitcherComponent.prototype.currentBoolTheme = function () {
        return this.themeToBool(this.theme);
    };
    ThemeSwitcherComponent.prototype.themeToBool = function (theme) {
        return theme.name === 'cosmic';
    };
    ThemeSwitcherComponent.prototype.boolToTheme = function (theme) {
        return theme ? 'cosmic' : 'default';
    };
    ThemeSwitcherComponent = __decorate([
        core_1.Component({
            selector: 'ngx-theme-switcher',
            styleUrls: ['./theme-switcher.component.scss'],
            template: "\n    <label class=\"theme-switch\">\n      <span class=\"light nb-sunny\"></span>\n      <div class=\"switch\">\n        <input type=\"checkbox\" [checked]=\"currentBoolTheme()\" (change)=\"toggleTheme(theme.checked)\" #theme>\n        <span class=\"slider\"></span>\n      </div>\n      <span class=\"cosmic nb-star\"></span>\n    </label>\n  ",
        })
    ], ThemeSwitcherComponent);
    return ThemeSwitcherComponent;
}());
exports.ThemeSwitcherComponent = ThemeSwitcherComponent;
