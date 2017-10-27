import { TourStatus, HttpMethod, TourType, ServiceType } from "./enums";
import { Helper } from "../../utils/utils";

export class Destination {
  id = 0;
  name = "";
}

export class Place {
  id = 0;
  name = 0;
}

export class Tour {
  id = 0;
  destinationId = 0;//@TODO merge destination and place into one table
  duration = 0;
  date = 0;
  placeId = 0;
  type: TourType = TourType.Flight;
  status: TourStatus = TourStatus.Create;
  adultCount = 0;
  adultMinPrice = 0;
  busPrice: number = undefined;
  roomPrice: number = undefined;
  foodPrice: number = undefined;
  infantPrice = 0;
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
