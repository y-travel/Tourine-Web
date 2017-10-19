//we can not new generic types that's why have to use this interface

export interface NoParamConstructor<T> {
    new (): T;
}

export interface ComponentType<T> {
    new (...args: any[]): T;
}

export class Serializable {

    static fromJSONToArray<T>(model: NoParamConstructor<T>, arrayJson: any[], checkItem = false): Array<T> {
        let array = new Array<T>();
        for (const item of arrayJson) {
            array.push(this.fromJSON(new model(), item, checkItem));
        }
        return array;
    }

    static fromJSON<T>(model: T, json, checkItem = false): T {
        for (let propName in json)
            if (!checkItem || (model.hasOwnProperty(propName) && Object.getOwnPropertyDescriptor(model, propName)))
                model[propName] = json[propName];
        return model;
    }

    static fromJSONToType<T>(model: NoParamConstructor<T>, json): T {
        return Serializable.fromJSON(new model(), json, true);
    }

    static toJSON(model): any {
        return JSON.stringify(model);
    }

    static clone<T>(target: T, source: T): T {
        return this.fromJSON(target, source, true);
    }
}
