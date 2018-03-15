import { HttpMethod, TourStatus, OptionType } from './enums';

export interface IModel {
  isNew(): boolean;
}

export class Model implements IModel {
  id = '';

  isNew(): boolean {
    return !this.id;
  }
}

export class Destination extends Model {
  name = '';
}

export class Place extends Model {
  name = '';
}

export class Tour extends Model {
  capacity: number;
  basePrice: number;
  parentId: string;
  parent: Tour;
  code: string;
  status: TourStatus;
  tourDetailId: string;
  tourDetail: TourDetail;
  agencyId: string;
  agency: Agency;
}

export class TourDetail extends Model {
  destinationId: string;
  destination: Destination;
  duration: number;
  startDate: string;
  placeId: string;
  place: Place;
  isFlight: boolean;
  infantPrice: number;
  busPrice: number;
  roomPrice: number;
  foodPrice: number;
  creationDate: string;
  leaderId: string;
  leader: Person;
}

export class Agency extends Model {
  name: string;
  phoneNumber: string;
}

export class AgencyInfo extends Model {
  name: string;
  phoneNumber: string;
  person: Person;
}

export class PersonAgency {
  agency: Agency;
  person: Person;
}

export class Coupon extends Model {
  reagentId: number = undefined;
  reagent: Person = undefined;
  passengers: Person[] = [];
  adultCount: number = undefined;
  adultPrice: number = undefined;
  infantCount: number = undefined;
  infantPrice: number = undefined;
  busPrice: number = undefined;
  roomPrice: number = undefined;
  foodPrice: number = undefined;
}

export class Block extends Model {
  agencyId: string = undefined;
  parentId: string = undefined;
  capacity: number = undefined;
  infantPrice: number = undefined;
  busPrice: number = undefined;
  roomPrice: number = undefined;
  foodPrice: number = undefined;
  tourPrice: number = undefined;
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

export class Person extends Model {
  name = '';
  family = '';
  mobileNumber = '';
  nationalCode = '';
  fatherName = '';
  birthDate: Date;
  passportExpireDate: Date;
  visaExpireDate: Date;
  passportNo = 0;
  gender = true;
  personType = 0;
  socialNumber = '';
  isUnder5 = true;
  isInfant = false;
}
export class PersonIncome {
  optionType: OptionType = OptionType.Empty;
  //temp
  receivedMoney: number;
  incomeStatus: number;
  currencyFactor: number;
}
export class TeamMember {
  personId: string = undefined;
  person: Person = undefined;
  personIncomes: PersonIncome[] = [];
  visaDelivered: boolean = undefined;
  passportDelivered: boolean = undefined;
}

export enum Role {
  Admin = 1,
  Operator = 2,
  Agency = 4,
}

export class User extends Model {
  username = '';
  password = '';
  // @References(typeof(Person))
  PersonId: string;

  Person: Person;
  Role: Role;
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

export interface IPost {

}

export function Route(path: string, type: HttpMethod = 'GET') {
  return (target: any) => {

    const original = target;
    const createApiPath = function (path: string, object: any) {
      let newPath = path;
      for (const field in object) {
        newPath = newPath.replace(`{${field}}`, object[field]);
      }
      return newPath;
    };
    const pathFn = function () {
      return createApiPath(path, this);
    }; //by using ()=>{} "this" got a wrong value
    const httpMethodFn = function () {
      return type;
    };

    const wrapper: any = function (...args: any[]) {//if we use (...args)=> or without parameters raise error: <classname> is not a constructor
      Reflect.defineProperty(wrapper.prototype,
        'apiPath',
        {
          get: pathFn
        });
      Reflect.defineProperty(wrapper.prototype,
        'httpMethod',
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
