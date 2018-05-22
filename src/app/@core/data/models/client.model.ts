import { HttpMethod, IncomeStatus, OptionStatus, OptionType, PersonType, TourStatus } from './enums';
import { NewFormService } from '../form.service';

export interface IModel {
  isNew(): boolean;
}

export class Model implements IModel {
  id = '';

  isNew(): boolean {
    return !this.id;
  }
}

export interface IViewModel<T> {
  form: NewFormService<T>;

  init(model?: T, ...params);
}

export class Destination extends Model {
  name = '';
}

export class Place extends Model {
  name = '';
}

export class TourOption extends Model {
  price: number;
  tourId: string;

  constructor(public optionType = OptionType.Empty,
              public optionStatus: OptionStatus = OptionStatus.Limited) {
    super();
  }
}

export class TourDetail extends Model {
  destinationId: string;
  destination: Destination;
  duration: number;
  startDate: string;
  placeId: string;
  place: Place;
  isFlight = true;
  infantPrice: number;
  busPrice: number;
  roomPrice: number;
  foodPrice: number;
  creationDate: string;
  leaderId: string;
  leader: Person;
}

export class Tour extends Model {
  capacity: number;
  infantPrice: number = undefined;
  basePrice: number;
  parentId: string;
  parent: Tour;
  code: string;
  status: TourStatus;
  options: TourOption[] = [
    new TourOption(OptionType.Food, OptionStatus.Unlimited),
    new TourOption(OptionType.Bus),
    new TourOption(OptionType.Room),
  ];
  tourDetailId: string;
  tourDetail: TourDetail = new TourDetail();
  agencyId: string;
  agency: Agency;
  isBlock: boolean;
  freeSpace: number;
}

export class Agency extends Model {
  name: string;
  phoneNumber: string;
}

export class PersonAgency {
  agency: Agency;
  person: Person;
}

export class Block extends Model {
  agencyId: string = undefined;
  agency: Agency;
  parentId: string = undefined;
  capacity: number = undefined;
  infantPrice: number = undefined;
  busPrice: number = undefined;
  roomPrice: number = undefined;
  foodPrice: number = undefined;
  basePrice: number = undefined;
  totalPrice: number = undefined;
  freeSpace: number = undefined;
  options: TourOption[];
}

export class EditPassword extends Model {
  oldPassword: string = undefined;
  password: string = undefined;
  rePassword: string = undefined;
}

export interface Person extends Model {
  name: string ;
  family: string;
  mobileNumber: string;
  nationalCode: string;
  fatherName: string;
  birthDate: Date;
  passportExpireDate: Date;
  visaExpireDate: Date;
  passportNo: number;
  gender: boolean;
  type: PersonType;
  socialNumber: string;
  isUnder5: boolean;
  isInfant: boolean;
  englishFamily: string;
  englishName: string;
}

export class PersonIncome {
  // temp
  reserved = true;
  receivedMoney: number;
  incomeStatus: IncomeStatus;
  currencyFactor: number;

  constructor(public optionType: OptionType = OptionType.Empty) {
  }
}

export class TeamMember {
  personId: string = undefined;
  person: Person = <Person>{};
  personIncomes: PersonIncome[] = this.person && this.person.isInfant
    ? null
    : [
      new PersonIncome(OptionType.Room),
      new PersonIncome(OptionType.Bus),
      new PersonIncome(OptionType.Food),
    ]; // @TODO check ugly
  haveVisa = true;
  passportDelivered: boolean = undefined;
  tourId: string = undefined;
  teamId: string = undefined;
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

export class TeamPassenger {
  buyer: TeamMember;
  passengers: TeamMember[];
}


export class TourPassenger {
  tour: Tour;
  leader: Person;
  passengers: TeamMember[];
}

// @TODO replace with a good class
export interface Dictionary<T> {
  [index: string]: T;
}

export class Team extends Model {
  tourId: string;
  count: number;
  buyerId: string;
  buyer: Person;
  infantPrice: number;
  basePrice: number;
  totalPrice: number;
  buyerIsPassenger: boolean;
}

export class TourTeamMember {
  isTeam: boolean;
  tourId: string;
  basePrice: number;
  infantPrice: number;
  foodPrice: number;
  roomPrice: number;
  busPrice: number;
  agencyName: string;
  teams: Team[];
}

export class TourPassengers {
  tour: Tour;
  leader: Person;
  passengers: Person[];
}

export class TourBuyer {
  id: string;
  isAgency: boolean;
  title: string;
  prefix: string;
  phone: string;
  count: number;
  price: number;
  gender: boolean;
}

export interface IReturn<T> {
  createResponse(): T;

  getTypeName(): string;
}

export interface IReturnVoid extends IReturn<void> {
}

export class QueryBase {
  // @DataMember(Order=1)
  skip: number;

  // @DataMember(Order=2)
  take: number;

  // @DataMember(Order=3)
  orderBy: string;

  // @DataMember(Order=4)
  orderByDesc: string;

  // @DataMember(Order=5)
  include: string;

  // @DataMember(Order=6)
  fields: string;

  // @DataMember(Order=7)
  meta: { [index: string]: string; };
}


export class QueryDb<T> extends QueryBase {
}

export function Route(originPath: string, type: HttpMethod = 'GET') {
  return (target: any) => {

    const original = target;
    const createApiPath = function (path: string, object: any) {
      let newPath = path;
      for (const field in Object.keys(object)) {
        newPath = newPath.replace(`{${field}}`, object[field]);
      }
      return newPath;
    };
    const pathFn = function () {
      return createApiPath(originPath, this);
    }; // by using ()=>{} "this" got a wrong value
    const httpMethodFn = function () {
      return type;
    };

    const wrapper: any = function (...args: any[]) {// if we use (...args)=> or without parameters raise error: <classname> is not a constructor
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
