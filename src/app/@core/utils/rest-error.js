"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializable_1 = require("./serializable");
var ValidationError = /** @class */ (function () {
    function ValidationError(field, message) {
        if (field === void 0) { field = null; }
        if (message === void 0) { message = null; }
        this.field = field;
        this.message = message;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
var RestError = /** @class */ (function () {
    function RestError(error, errorType) {
        if (errorType === void 0) { errorType = RestErrorType.Other; }
        this.error = error;
        this.errorType = errorType;
    }
    RestError.prototype.getValidationErrors = function () {
        var validationErrors = new Array();
        for (var _i = 0, _a = this.error.Errors; _i < _a.length; _i++) {
            var error = _a[_i];
            validationErrors.push(serializable_1.Serializable.fromJSONToType(ValidationError, error));
        }
        return validationErrors;
    };
    return RestError;
}());
exports.RestError = RestError;
var RestErrorType;
(function (RestErrorType) {
    RestErrorType[RestErrorType["Other"] = 0] = "Other";
    RestErrorType[RestErrorType["Validation"] = 1] = "Validation";
})(RestErrorType = exports.RestErrorType || (exports.RestErrorType = {}));
