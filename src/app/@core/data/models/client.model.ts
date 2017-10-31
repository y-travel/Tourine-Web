import { TourStatus, HttpMethod } from "./enums";
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
  duration: number = undefined;
  date: string = undefined;
  placeId = 0;
  isFlight = true;
  status: TourStatus = TourStatus.Create;
  capacity = 0;
  adultCount: number = undefined;
  adultMinPrice: number = undefined;
  busPrice: number = undefined;
  roomPrice: number = undefined;
  foodPrice: number = undefined;
  infantPrice: number = undefined;
}

export class Coupon {
  reagentId: number = undefined;
  reagent: Customer = undefined;
  passengers:Customer[]=[];
  adultCount=1;
  adultPrice=0;
  infantCount=0;
  infantPrice=0;
  busPrice=0;
  roomPrice=0;
  foodPrice=0;
}

export class Customer {

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
