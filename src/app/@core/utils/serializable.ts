//we can not new generic types that's why have to use this interface

export interface TypeConstructor<T> {
  new (): T;
}

export interface ComponentType<T> {
  new (...args: any[]): T;
}

export class Serializable {

  static fromJSONToArray<T>(model: TypeConstructor<T>, arrayJson: any[], checkItem = false): Array<T> {
    const array = new Array<T>();
    for (const item of arrayJson) {
      array.push(this.fromJSON(new model(), item, checkItem));
    }
    return array;
  }

  static fromJSON<T>(model: T, json, checkItem = false): T {
    for (const propName in json) {
      if (!checkItem || (model.hasOwnProperty(propName) && Object.getOwnPropertyDescriptor(model, propName))) {
        model[propName] = json[propName];
      }
    }
    return model;
  }

  static fromJSONToType<T>(model: TypeConstructor<T>, json, checkItem = true): T {
    return Serializable.fromJSON(new model(), json, checkItem);
  }

  static toJSON(model): any {
    return JSON.stringify(model);
  }

  static clone<T>(target: T, source: T): T {
    return this.fromJSON(target, source, true);
  }
}

