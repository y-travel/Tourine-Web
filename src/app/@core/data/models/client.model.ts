import { TourStatus ,HttpMethod} from "./enums";
import { Helper } from "../../utils/utils";


export class Tour {
  id = 0;
  code = "";
  price = 0;
  capacity = 0;
  status: TourStatus = undefined;
  destination = "";
}

//@TODO replace with a good class
export interface Dictionary<T> {
  [index: string]: T;
}

export interface IReturn<T> {
  createResponse(): T;
  getTypeName(): string;
}

export interface IReturnVoid extends IReturn<void> {
}

export function Route(path: string, type: HttpMethod = "GET") {
  return (target: any) => {

    var original = target;
    var pathFn = function () {
      return Helper.createApiPath(path, this);
    };//by using ()=>{} "this" got a wrong value
    var httpMethodFn = function () {
      return type;
    };
    var wrapper: any = function (...args: any[]) {//if we use (...args)=> or without parameters raise error: <classname> is not a constructor
      Reflect.defineProperty(wrapper.prototype,
        "apiPath",
        {
          get: pathFn
        });
      Reflect.defineProperty(wrapper.prototype,
        "httpMethod",
        {
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
