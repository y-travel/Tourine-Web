"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helper = /** @class */ (function () {
    function Helper() {
        this.disableBrowserRefresh = false;
    }
    Helper.getApiPath = function (object) {
        return Reflect.get(object, "apiPath");
    };
    Helper.getHttpMethod = function (object) {
        return Reflect.get(object, "httpMethod");
    };
    Helper.createApiPath = function (path, object) {
        var newPath = path;
        for (var field in object) {
            newPath = newPath.replace("{" + field + "}", object[field]);
        }
        return newPath;
    };
    return Helper;
}());
exports.Helper = Helper;
