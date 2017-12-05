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

export class Destination extends Model{
  name = "";
}

export class Place extends Model{
  name = 0;
}

export class Tour extends Model{
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

export class Coupon extends Model{
  reagentId: number = undefined;
  reagent: Customer = undefined;
  passengers: Customer[] = [];
  adultCount = 1;
  adultPrice = 0;
  infantCount = 0;
  infantPrice = 0;
  busPrice = 0;
  roomPrice = 0;
  foodPrice = 0;
}

export class User extends Model{
  cellphone: string = undefined;
  name: string = undefined;
  userName: string = undefined;
  password: string = undefined;
  rePassword: string = undefined;
}

export class Reagent extends Model{
  managerName: string = undefined;
  agencyName: string = undefined;
  cellPhone: string = undefined;
  phone: string = undefined;
  email: string = undefined;
}

export class Customer extends Model{
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
