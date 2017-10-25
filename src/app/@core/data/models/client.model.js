"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils/utils");
var Tour = /** @class */ (function () {
    function Tour() {
        this.id = 0;
        this.code = "";
        this.price = 0;
        this.capacity = 0;
        this.status = undefined;
        this.destination = "";
    }
    return Tour;
}());
exports.Tour = Tour;
function Route(path, type) {
    if (type === void 0) { type = "GET"; }
    return function (target) {
        var original = target;
        var pathFn = function () {
            return utils_1.Helper.createApiPath(path, this);
        }; //by using ()=>{} "this" got a wrong value
        var httpMethodFn = function () {
            return type;
        };
        var wrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            Reflect.defineProperty(wrapper.prototype, "apiPath", {
                get: pathFn
            });
            Reflect.defineProperty(wrapper.prototype, "httpMethod", {
                get: httpMethodFn
            });
            wrapper.prototype.constructor(args);
            return wrapper.prototype;
        };
        // copy prototype so instanceof operator still works
        wrapper.prototype = original.prototype;
        return wrapper;
    };
}
exports.Route = Route;
