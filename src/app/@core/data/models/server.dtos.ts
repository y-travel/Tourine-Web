import { Agency, IReturn, IReturnVoid, Tour, User, Person, Role, Destination, Place, IPost, TourDetail, Route,TeamMember,PersonIncome } from './client.model';
import {OptionType , IncomeStatus} from './enums';

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

export class QueryDb_1<T> extends QueryBase {
}

// @DataContract
export class ResponseError {
  // @DataMember(Order=1, EmitDefaultValue=false)
  errorCode: string;

  // @DataMember(Order=2, EmitDefaultValue=false)
  fieldName: string;

  // @DataMember(Order=3, EmitDefaultValue=false)
  message: string;

  // @DataMember(Order=4, EmitDefaultValue=false)
  meta: { [index: string]: string; };
}

// @DataContract
export class ResponseStatus {
  // @DataMember(Order=1)
  errorCode: string;

  // @DataMember(Order=2)
  message: string;

  // @DataMember(Order=3)
  stackTrace: string;

  // @DataMember(Order=4)
  errors: ResponseError[];

  // @DataMember(Order=5)
  meta: { [index: string]: string; };
}

export enum OptionStatus {
  Limited = 1,
  Unlimited = 2,
}

export class TourOption {
  id: string;
  optionType: OptionType;
  price: number;
  optionStatus: OptionStatus;
  tourId: string;
}

export class Team {
  id: string;
  // @References(typeof(Tour))
  tourId: string;

  tour: Tour;
  count: number;
  submitDate: string;
  // @References(typeof(Person))
  buyerId: string;

  buyer: Person;
}

export class TeamPerson {
  id: string;
  // @References(typeof(Team))
  teamId: string;

  team: Team;
  // @References(typeof(Person))
  personId: string;

  person: Person;
}

export class QueryDb_2<From, Into> extends QueryBase {
}

// @Flags()
export enum PersonType {
  Passenger = 1,
  Customer = 2,
  Leader = 4,
}

// @DataContract
export class QueryResponse<T>
{
  // @DataMember(Order=1)
  offset: number;

  // @DataMember(Order=2)
  total: number;

  // @DataMember(Order=3)
  results: T[];

  // @DataMember(Order=4)
  meta: { [index: string]: string; };

  // @DataMember(Order=5)
  responseStatus: ResponseStatus;
}

export class PassengerList {
  id: string;
  // @References(typeof(Person))
  personId: string;

  person: Person;
  // @References(typeof(Tour))
  tourId: string;

  tour: Tour;
  optionType: OptionType;
  receivedMoney: number;
  currencyFactor: number;
  incomeStatus: IncomeStatus;
  visaDelivered: boolean;
  passportDelivered: boolean;
}

export class AgencyPerson {
  id: string;
  // @References(typeof(Agency))
  agencyId: string;

  agency: Agency;
  // @References(typeof(Person))
  personId: string;

  person: Person;
}

// @DataContract
export class AuthenticateResponse {
  // @DataMember(Order=1)
  userId: string;

  // @DataMember(Order=2)
  sessionId: string;

  // @DataMember(Order=3)
  userName: string;

  // @DataMember(Order=4)
  displayName: string;

  // @DataMember(Order=5)
  referrerUrl: string;

  // @DataMember(Order=6)
  bearerToken: string;

  // @DataMember(Order=7)
  refreshToken: string;

  // @DataMember(Order=8)
  responseStatus: ResponseStatus;

  // @DataMember(Order=9)
  meta: { [index: string]: string; };
}

// @DataContract
export class ConvertSessionToTokenResponse {
  // @DataMember(Order=1)
  meta: { [index: string]: string; };

  // @DataMember(Order=2)
  responseStatus: ResponseStatus;
}

// @DataContract
export class GetAccessTokenResponse {
  // @DataMember(Order=1)
  accessToken: string;

  // @DataMember(Order=2)
  responseStatus: ResponseStatus;
}

@Route("/disBot", "GET")
export class TourineBotDisabler implements IReturn<string>
{
  createResponse() { return ""; }
  getTypeName() { return "TourineBotDisabler"; }
}

@Route("/enBot", "GET")
export class TourineBotEnabler implements IReturn<string>
{
  createResponse() { return ""; }
  getTypeName() { return "TourineBotEnabler"; }
}

@Route("/user/{Id}", "GET")
export class GetUser {
  id: string;
}

@Route("/user/", "POST")
export class PostUser implements IReturn<User>
{
  user: User;
  createResponse() { return new User(); }
  getTypeName() { return "PostUser"; }
}

@Route("/user", "PUT")
export class PutUser {
  user: User;
}

@Route("/tours/{ID}", "GET")
export class GetTour {
  id: string;
}

@Route("/tours", "GET")
export class GetTours extends QueryDb_1<Tour> implements IReturn<QueryResponse<Tour>>
{
  createResponse() { return new QueryResponse<Tour>(); }
  getTypeName() { return "GetTours"; }
}

/**
* ww
*/
@Route("/tours/", "POST")
// @Api(BodyParameter=2, Description="ww", IsRequired=true)
export class CreateTour implements IReturn<Tour>
{
  capacity: number;
  basePrice: number;
  infantPrice: number;
  options: TourOption[];
  tourDetail: TourDetail;
  createResponse() { return new Tour(); }
  getTypeName() { return "CreateTour"; }
}

@Route("/tours/{TourId}", "PUT")
export class UpdateTour implements IReturn<Tour>
{
  tourId: string;
  capacity: number;
  basePrice: number;
  infantPrice: number;
  options: TourOption[];
  tourDetail: TourDetail;
  createResponse() { return new Tour(); }
  getTypeName() { return "UpdateTour"; }
}

@Route("/tours/root", "GET")
export class GetRootTours extends QueryDb_1<Tour> implements IReturn<QueryResponse<Tour>>
{
  createResponse() { return new QueryResponse<Tour>(); }
  getTypeName() { return "GetRootTours"; }
}

@Route("/tours/{TourId}/blocks", "GET")
export class GetBlocks extends QueryDb_1<Tour> implements IReturn<QueryResponse<Tour>>
{
  tourId: string;
  createResponse() { return new QueryResponse<Tour>(); }
  getTypeName() { return "GetBlocks"; }
}

@Route("/tours/{TourId}/freespace", "GET")
export class GetTourFreeSpace implements IReturn<string>
{
  tourId: string;
  createResponse() { return ""; }
  getTypeName() { return "GetTourFreespace"; }
}

@Route("/tour/{ParentId}/reserve/{AgencyId}", "POST")
export class ReserveBlock implements IReturn<Tour>
{
  parentId: string;
  agencyId: string;
  capacity: number;
  infantPrice: number;
  busPrice: number;
  roomPrice: number;
  foodPrice: number;
  basePrice: number;
  createResponse() { return new Tour(); }
  getTypeName() { return "ReserveBlock"; }
}

@Route("/tour/{Id}/reserve/{AgencyId}", "PUT")
export class UpdateBlock implements IReturn<Tour>
{
  id: string;
  parentId: string;
  agencyId: string;
  capacity: number;
  infantPrice: number;
  busPrice: number;
  roomPrice: number;
  foodPrice: number;
  basePrice: number;
  createResponse() { return new Tour(); }
  getTypeName() { return "UpdateBlock"; }
}

@Route("/tours/{TourId}", "DELETE")
export class DeleteTour {
  tourId: string;
}

@Route("/tourDetail/{ID}", "GET")
export class GetTourDetail implements IReturn<TourDetail>
{
  id: string;
  createResponse() { return new TourDetail(); }
  getTypeName() { return "GetTourDetail"; }
}

@Route("/tourDetail", "PUT")
export class UpdateTourDetail {
  tourDetail: TourDetail;
}

@Route("/tours/{TourId}/teams", "POST")
export class CreateTeam implements IReturnVoid{
  tourId: string;
  buyer: TeamMember;
  passengers: TeamMember[];
  createResponse(): void {
  }
  // @DataContract
  getTypeName(): string {
    return("CreateTeam");
  }
}

@Route("/team", "PUT")
export class UpdateTeam {
  team: Team;
}

@Route("/places")
export class GetPlaces extends QueryDb_1<Place> implements IReturn<QueryResponse<Place>>
{
  createResponse() { return new QueryResponse<Place>(); }
  getTypeName() { return "GetPlaces"; }
}

@Route("/post/", "POST")
export class PostPlace {
  place: Place;
}

@Route("/place", "PUT")
export class PutPlace {
  place: Place;
}

@Route("/person/team", "POST")
export class AddPersonToTeam {
  teamPerson: TeamPerson;
}

@Route("/persons/team", "PUT")
export class ChangePersonsTeam {
  teamPerson: TeamPerson;
}

@Route("/team/{TeamId}/persons/", "GET")
export class GetPersonsOfTeam extends QueryDb_1<Person> implements IReturn<QueryResponse<Person>>
{
  teamId: string;
  createResponse() { return new QueryResponse<Person>(); }
  getTypeName() { return "GetPersonsOfTeam"; }
}

@Route("/service", "POST")
export class PostServiceForPassenger implements IReturn<PassengerList>
{
  passengerList: PassengerList;
  createResponse() { return new PassengerList(); }
  getTypeName() { return "PostServiceForPassenger"; }
}

@Route("/service", "PUT")
export class PutServiceForPassenger {
  passengerList: PassengerList;
}

@Route("/service/{TourId}")
export class GetServiceOfTour extends QueryDb_2<PassengerList, Person> implements IReturn<QueryResponse<Person>>
{
  tourId: string;
  createResponse() { return new QueryResponse<Person>(); }
  getTypeName() { return "GetServiceOfTour"; }
}

@Route("/persons/", "POST")
export class AddNewPerson implements IReturn<Person>
{
  person: Person;
  createResponse() { return new Person(); }
  getTypeName() { return "AddNewPerson"; }
}

@Route("/persons/", "PUT")
export class UpdatePerson implements IReturn<Person>
{
  person: Person;
  createResponse() { return new Person(); }
  getTypeName() { return "UpdatePerson"; }
}

@Route("/persons/", "GET")
@Route("/persons/{id}", "GET")
export class GetPersons extends QueryDb_1<Person> implements IReturn<QueryResponse<Person>>
{
  id: string;
  createResponse() { return new QueryResponse<Person>(); }
  getTypeName() { return "GetPersons"; }
}

@Route("/persons/{ID}", "DELETE")
export class DeletePerson {
  id: string;
}

@Route("/persons/nc/{NationalCode}", "GET")
export class FindPersonFromNc implements IReturn<Person>
{
  nationalCode: string;
  createResponse() { return new Person(); }
  getTypeName() { return "FindPersonFromNc"; }
}

@Route("/persons/search/{Str}/agency{AgencyId}/", "GET")
@Route("/persons/search/{Str}", "GET")
export class FindPersonInAgency extends QueryDb_1<Person> implements IReturn<QueryResponse<Person>>
{
  agencyId: string;
  str: string;
  createResponse() { return new QueryResponse<Person>(); }
  getTypeName() { return "FindPersonInAgency"; }
}

@Route("/persons/leaders", "GET")
export class GetLeaders extends QueryDb_1<Person> implements IReturn<QueryResponse<Person>>
{
  createResponse() { return new QueryResponse<Person>(); }
  getTypeName() { return "GetLeaders"; }
}

@Route("/persons/register")
export class RegisterPerson implements IReturn<Team>
{
  tourId: string;
  buyerId: string;
  passengersId: string[];
  createResponse() { return new Team(); }
  getTypeName() { return "RegisterPerson"; }
}

@Route("/persons/current", "GET")
export class GetCurrentPerson implements IReturn<Person>
{
  createResponse() { return new Person(); }
  getTypeName() { return "GetCurrentPerson"; }
}

@Route("/notify/agency/tour/{TourId}/role/{Role}", "POST")
export class SendNotifyToTourAgencies {
  tourId: string;
  role: Role;
  msg: string;
}

@Route("/notify/tour/{TourId}/buyers/", "POST")
export class SendNotifyToTourBuyers {
  tourId: string;
  msg: string;
}

@Route("/notify/tour/{TourId}/passengers/", "POST")
export class SendNotifyToTourPassengers {
  tourId: string;
  msg: string;
}

@Route("/notify/tour/{TourId}/leader", "POST")
export class SendNotifyToTourLeader {
  tourId: string;
  msg: string;
}

@Route("/destinations/{Id}", "GET")
@Route("/destinations", "GET")
export class GetDestinations extends QueryDb_1<Destination> implements IReturn<QueryResponse<Destination>>
{
  id: string;
  createResponse() { return new QueryResponse<Destination>(); }
  getTypeName() { return "GetDestinations"; }
}

@Route("/destination/", "POST")
export class CreateDestination implements IReturn<Destination>
{
  destination: Destination;
  createResponse() { return new Destination(); }
  getTypeName() { return "CreateDestination"; }
}

@Route("/destination/", "PUT")
export class UpdateDestination {
  destination: Destination;
}

@Route("/agencies/persons/", "GET")
export class GetPersonOfAgency extends QueryDb_1<Person> implements IReturn<QueryResponse<Person>>
{
  // @Ignore()
  agencyId: string;
  createResponse() { return new QueryResponse<Person>(); }
  getTypeName() { return "GetPersonOfAgency"; }
}

@Route("/agencies/persons", "POST")
export class AddPersonToAgency implements IReturn<AgencyPerson>
{
  // @Ignore()
  agencyId: string;

  personId: string;
  createResponse() { return new AgencyPerson(); }
  getTypeName() { return "AddPersonToAgency"; }
}

@Route("/agencies/persons", "PUT")
export class UpdatePersonToAgency {
  id: string;
  agencyId: string;
  personId: string;
}

@Route("/agencies/{id}", "GET")
export class GetAgency implements IReturn<Agency>
{
  id: string;
  createResponse() { return new Agency(); }
  getTypeName() { return "GetAgency"; }
}

@Route("/agencies", "POST")
export class CreateAgency implements IReturn<Agency>
{
  agency: Agency;
  person: Person;
  createResponse() { return new Agency(); }
  getTypeName() { return "CreateAgency"; }
}

@Route("/agencies", "PUT")
export class UpdateAgency {
  agency: Agency;
}

@Route("/agencies", "GET")
export class GetAgencies extends QueryDb_1<Agency> implements IReturn<QueryResponse<Agency>>
{
  createResponse() { return new QueryResponse<Agency>(); }
  getTypeName() { return "GetAgencies"; }
}

@Route("/agencies/find/str", "GET")
export class FindAgency extends QueryDb_1<Agency> implements IReturn<QueryResponse<Agency>>
{
  str: string;
  createResponse() { return new QueryResponse<Agency>(); }
  getTypeName() { return "FindAgency"; }
}

@Route("/auth")
@Route("/auth/{provider}")
@Route("/authenticate")
@Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost {
  // @DataMember(Order=1)
  provider: string;

  // @DataMember(Order=2)
  state: string;

  // @DataMember(Order=3)
  oauth_token: string;

  // @DataMember(Order=4)
  oauth_verifier: string;

  // @DataMember(Order=5)
  userName: string;

  // @DataMember(Order=6)
  password: string;

  // @DataMember(Order=7)
  rememberMe: boolean;

  // @DataMember(Order=8)
  continue: string;

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
  useTokenCookie: boolean;

  // @DataMember(Order=16)
  accessToken: string;

  // @DataMember(Order=17)
  accessTokenSecret: string;

  // @DataMember(Order=18)
  meta: { [index: string]: string; };
  createResponse() { return new AuthenticateResponse(); }
  getTypeName() { return "Authenticate"; }
}

@Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>, IPost {
  // @DataMember(Order=1)
  preserveSession: boolean;
  createResponse() { return new ConvertSessionToTokenResponse(); }
  getTypeName() { return "ConvertSessionToToken"; }
}

@Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>, IPost {
  // @DataMember(Order=1)
  refreshToken: string;
  createResponse() { return new GetAccessTokenResponse(); }
  getTypeName() { return "GetAccessToken"; }
}
