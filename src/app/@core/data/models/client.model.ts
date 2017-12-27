import { HttpMethod, TourStatus } from "./enums";
import { Helper } from "../../utils/utils";

export interface IModel {
  isNew(): boolean;
}

export class Model implements IModel {
  id = 0;

  isNew(): boolean {
    return !this.id;
  }
}

export class Destination extends Model {
  name = "";
}

export class Place extends Model {
  name = 0;
}

export class Tour extends Model {
  destinationId = 0; //@TODO merge destination and place into one table
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

export class Coupon extends Model {
  reagentId: number = undefined;
  reagent: Customer = undefined;
  passengers: Customer[] = [];
  adultCount: number = undefined;
  adultPrice: number = undefined;
  infantCount: number = undefined;
  infantPrice: number = undefined;
  busPrice: number = undefined;
  roomPrice: number = undefined;
  foodPrice: number = undefined;
}

export class EditPassword extends Model {
  oldPassword: string = undefined;
  password: string = undefined;
  rePassword: string = undefined;
}

export class Reagent extends Model {
  name: string = undefined;
  family: string = undefined;
  agencyName: string = undefined;
  mobileNumber: string = undefined;
  phone: string = undefined;
  email: string = undefined;

  get title(): string {
    return `${this.name} ${this.family}`;
  }
}

export class Customer extends Model {
  name = "";
  family = "";
  mobileNumber = "";
  nationalCode = "";
  fatherName = "";
  birthDate = "";
  passportExpireDate: Date;
  passportNo = 0;
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

    const original = target;
    const pathFn = function () {
      return Helper.createApiPath(path, this);
    }; //by using ()=>{} "this" got a wrong value
    const httpMethodFn = function () {
      return type;
    };
    const wrapper: any = function (...args: any[]) {//if we use (...args)=> or without parameters raise error: <classname> is not a constructor
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

    // copy prototype so instance of operator still works
    wrapper.prototype = original.prototype;
    return wrapper;
  };
}
