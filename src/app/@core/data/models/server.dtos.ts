/* Options:
Date: 2018-01-18 20:39:56
Version: 4.514
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://tourine.ir/api

//GlobalNamespace:
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion:
//AddDescriptionAsComments: True
//IncludeTypes:
ExcludeTypes: IReturn,IReturnVoid,Tour,User,Person,Role,Destination,Place
DefaultImports: {IReturn,IReturnVoid,Tour,User,Person,Role,Destination,Place,IPost}
*/

import { Destination, IPost, IReturn, Person, Place, Route, Tour, User } from "./client.model";


export class QueryBase {
  // @DataMember(Order=1)
  Skip: number;

  // @DataMember(Order=2)
  Take: number;

  // @DataMember(Order=3)
  OrderBy: string;

  // @DataMember(Order=4)
  OrderByDesc: string;

  // @DataMember(Order=5)
  Include: string;

  // @DataMember(Order=6)
  Fields: string;

  // @DataMember(Order=7)
  Meta: { [index: string]: string; };
}

export class QueryDb<T> extends QueryBase {
}

// @DataContract
export class ResponseError {
  // @DataMember(Order=1, EmitDefaultValue=false)
  ErrorCode: string;

  // @DataMember(Order=2, EmitDefaultValue=false)
  FieldName: string;

  // @DataMember(Order=3, EmitDefaultValue=false)
  Message: string;

  // @DataMember(Order=4, EmitDefaultValue=false)
  Meta: { [index: string]: string; };
}

// @DataContract
export class ResponseStatus {
  // @DataMember(Order=1)
  ErrorCode: string;

  // @DataMember(Order=2)
  Message: string;

  // @DataMember(Order=3)
  StackTrace: string;

  // @DataMember(Order=4)
  Errors: ResponseError[];

  // @DataMember(Order=5)
  Meta: { [index: string]: string; };
}

export class Agency {
  Id: string;
  Name: string;
  PhoneNumber: string;
}

export class Passenger {
  Id: string;
  Name: string;
  Family: string;
  MobileNumber: string;
  NationalCode: string;
  BirthDate: string;
  PassportExpireDate: string;
  // @References(typeof(Agency))
  AgencyId: string;

  Agency: Agency;
  PassportNo: string;
}

export class Block {
  Id: string;
  Code: string;
  // @References(typeof(Tour))
  TourId: string;

  Tour: Tour;
  Price: number;
  Capacity: number;
  // @References(typeof(Block))
  ParentId: string;

  Parent: Block;
  // @References(typeof(Person))
  PersonId: string;

  Person: Person;
  SubmitDate: string;
}

// @DataContract
export class QueryResponse<T> {
  // @DataMember(Order=1)
  Offset: number;

  // @DataMember(Order=2)
  Total: number;

  // @DataMember(Order=3)
  Results: T[];

  // @DataMember(Order=4)
  Meta: { [index: string]: string; };

  // @DataMember(Order=5)
  ResponseStatus: ResponseStatus;
}

// @DataContract
export class AuthenticateResponse {
  // @DataMember(Order=1)
  UserId: string;

  // @DataMember(Order=2)
  SessionId: string;

  // @DataMember(Order=3)
  UserName: string;

  // @DataMember(Order=4)
  DisplayName: string;

  // @DataMember(Order=5)
  ReferrerUrl: string;

  // @DataMember(Order=6)
  BearerToken: string;

  // @DataMember(Order=7)
  RefreshToken: string;

  // @DataMember(Order=8)
  ResponseStatus: ResponseStatus;

  // @DataMember(Order=9)
  Meta: { [index: string]: string; };
}

// @DataContract
export class ConvertSessionToTokenResponse {
  // @DataMember(Order=1)
  Meta: { [index: string]: string; };

  // @DataMember(Order=2)
  ResponseStatus: ResponseStatus;
}

// @DataContract
export class GetAccessTokenResponse {
  // @DataMember(Order=1)
  AccessToken: string;

  // @DataMember(Order=2)
  ResponseStatus: ResponseStatus;
}

@Route("/user/{Id}", "GET")
export class GetUser {
  Id: string;
}

@Route("/user/", "POST")
export class PostUser {
  User: User;
}

@Route("/tour/{Id}", "GET")
export class GetTour {
  Id: string;
}

@Route("/tours", "GET")
export class GetTours extends QueryDb<Tour> implements IReturn<QueryResponse<Tour>> {
  createResponse() {
    return new QueryResponse<Tour>();
  }

  getTypeName() {
    return "GetTours";
  }
}

@Route("/tour/", "POST")
export class PostTour {
  Tour: Tour;
}

@Route("/tour/", "PUT")
export class PutTour {
  Tour: Tour;
}

@Route("/places")
export class GetPlace extends QueryDb<Place> implements IReturn<QueryResponse<Place>> {
  createResponse() {
    return new QueryResponse<Place>();
  }

  getTypeName() {
    return "GetPlace";
  }
}

@Route("/passenger/", "POST")
export class PostPassenger {
  Passenger: Passenger;
}

@Route("/passenger/", "PUT")
export class PutPassenger {
  Passenger: Passenger;
}

@Route("/passengers", "GET")
export class GetPassengers extends QueryDb<Passenger> implements IReturn<QueryResponse<Passenger>> {
  createResponse() {
    return new QueryResponse<Passenger>();
  }

  getTypeName() {
    return "GetPassengers";
  }
}

@Route("/passenger/{Id}", "DELETE")
export class DeletePassenger {
  Id: string;
}

@Route("/destinations", "GET")
export class GetDestinations extends QueryDb<Destination> implements IReturn<QueryResponse<Destination>> {
  createResponse() {
    return new QueryResponse<Destination>();
  }

  getTypeName() {
    return "GetDestinations";
  }
}

@Route("/Person/{Id}", "GET")
export class GetPerson implements IReturn<Person> {
  Id: string;

  createResponse() {
    return new Person();
  }

  getTypeName() {
    return "GetPerson";
  }
}

@Route("/Persons", "GET")
export class GetPersons extends QueryDb<Person> implements IReturn<QueryResponse<Person>> {
  createResponse() {
    return new QueryResponse<Person>();
  }

  getTypeName() {
    return "GetPersons";
  }
}

@Route("/Person/", "POST")
export class PostPerson {
  Person: Person;
}

@Route("/Person/", "PUT")
export class PutPerson {
  Person: Person;
}

@Route("/Person/{Id}", "DELETE")
export class DeletePerson {
  Id: string;
}

@Route("/blocks", "GET")
export class GetBlocks extends QueryDb<Block> implements IReturn<QueryResponse<Block>> {
  createResponse() {
    return new QueryResponse<Block>();
  }

  getTypeName() {
    return "GetBlocks";
  }
}

@Route("/block", "POST")
export class PostBlock {
  Block: Block;
}

@Route("/auth", "POST")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost {
  // @DataMember(Order=1)
  provider: string;

  // @DataMember(Order=2)
  State: string;

  // @DataMember(Order=3)
  oauth_token: string;

  // @DataMember(Order=4)
  oauth_verifier: string;

  // @DataMember(Order=5)
  UserName: string;

  // @DataMember(Order=6)
  Password: string;

  // @DataMember(Order=7)
  RememberMe: boolean;

  // @DataMember(Order=8)
  Continue: string;

  // @DataMember(Order=9)
  nonce: string;

  // @DataMember(Order=10)
  uri: string;

  // @DataMember(Order=11)
  response: string;

  // @DataMember(Order=12)
  qop: string;

  // @DataMember(Order=13)
  nc: string;

  // @DataMember(Order=14)
  cnonce: string;

  // @DataMember(Order=15)
  UseTokenCookie: boolean;

  // @DataMember(Order=16)
  AccessToken: string;

  // @DataMember(Order=17)
  AccessTokenSecret: string;

  // @DataMember(Order=18)
  Meta: { [index: string]: string; };

  createResponse() {
    return new AuthenticateResponse();
  }

  getTypeName() {
    return "Authenticate";
  }
}

@Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>, IPost {
  // @DataMember(Order=1)
  PreserveSession: boolean;

  createResponse() {
    return new ConvertSessionToTokenResponse();
  }

  getTypeName() {
    return "ConvertSessionToToken";
  }
}

@Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>, IPost {
  // @DataMember(Order=1)
  RefreshToken: string;

  createResponse() {
    return new GetAccessTokenResponse();
  }

  getTypeName() {
    return "GetAccessToken";
  }
}
