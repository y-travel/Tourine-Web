"use strict";
//we can not new generic types that's why have to use this interface
Object.defineProperty(exports, "__esModule", { value: true });
var Serializable = /** @class */ (function () {
    function Serializable() {
    }
    Serializable.fromJSONToArray = function (model, arrayJson, checkItem) {
        if (checkItem === void 0) { checkItem = false; }
        var array = new Array();
        for (var _i = 0, arrayJson_1 = arrayJson; _i < arrayJson_1.length; _i++) {
            var item = arrayJson_1[_i];
            array.push(this.fromJSON(new model(), item, checkItem));
        }
        return array;
    };
    Serializable.fromJSON = function (model, json, checkItem) {
        if (checkItem === void 0) { checkItem = false; }
        for (var propName in json)
            if (!checkItem || (model.hasOwnProperty(propName) && Object.getOwnPropertyDescriptor(model, propName)))
                model[propName] = json[propName];
        return model;
    };
    Serializable.fromJSONToType = function (model, json) {
        return Serializable.fromJSON(new model(), json, true);
    };
    Serializable.toJSON = function (model) {
        return JSON.stringify(model);
    };
    Serializable.clone = function (target, source) {
        return this.fromJSON(target, source, true);
    };
    return Serializable;
}());
exports.Serializable = Serializable;
