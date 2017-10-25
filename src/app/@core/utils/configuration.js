"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Object.defineProperty(Configuration, "Server", {
        get: function () {
            var hostname = window.location.origin ? window.location.origin
                : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            if (hostname.includes("localhost"))
                return "http://www.tourine.ir";
            return hostname;
        },
        enumerable: true,
        configurable: true
    });
    Configuration.ApiUrl = Configuration.Server + "/api/";
    return Configuration;
}());
exports.Configuration = Configuration;
