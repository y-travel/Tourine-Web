import {
  Agency,
  Block,
  Destination,
  IPost,
  IReturn,
  IReturnVoid,
  Person,
  Place,
  QueryDb,
  Role,
  Route,
  Team,
  TeamMember,
  TeamPassenger,
  Tour,
  TourBuyer,
  TourDetail,
  TourOption,
  TourPassenger,
  TourPassengers,
  TourTeamMember,
  User,
} from './client.model';
import { IncomeStatus, OptionType } from './enums';


export class HttpResult
{
  response: Object;
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

export class TeamPerson {
  id: string;
  // @References(typeof(Team))
  teamId: string;

  team: Block;
  // @References(typeof(Person))
  personId: string;

  person: Person;
}


// @DataContract
export class QueryResponse<T> {
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

@Route('/user/{Id}', 'GET')
export class GetUser {
  id: string;
}

@Route('/user/', 'POST')
export class PostUser implements IReturn<User> {
  user: User;

  createResponse() {
    return new User();
  }

  getTypeName() {
    return 'PostUser';
  }
}

@Route('/user', 'PUT')
export class PutUser {
  user: User;
}

@Route('/tours/{ID}', 'GET')
export class GetTour {
  id: string;
}

@Route('/tours', 'GET')
export class GetTours extends QueryDb<Tour> implements IReturn<QueryResponse<Tour>> {
  createResponse() {
    return new QueryResponse<Tour>();
  }

  getTypeName() {
    return 'GetTours';
  }
}

@Route('/tours/{Id}', 'POST')
export class UpsertTour implements IReturn<Tour> {
  id = '';
  agencyId = '';
  parentId = '';
  isBlock = false;
  capacity: number = undefined;
  basePrice: number = undefined;
  infantPrice: number = undefined;
  options: TourOption[] = [];
  tourDetail: TourDetail = undefined;

  createResponse() {
    return new Tour();
  }

  getTypeName() {
    return 'UpsertTour';
  }
}

@Route('/tours/{Id}', 'DELETE')
export class DeleteTour implements IReturnVoid {
  id = '';

  createResponse(): void {
    return undefined;
  }

  getTypeName(): string {
    return 'DeleteTour';
  }
}

@Route('/tours/{TourId}/blocks', 'GET')
export class GetBlocks extends QueryDb<Tour> implements IReturn<QueryResponse<Tour>> {
  tourId: string;

  createResponse() {
    return new QueryResponse<Tour>();
  }

  getTypeName() {
    return 'GetBlocks';
  }
}

@Route('/tours/{TourId}/freespace', 'GET')
export class GetTourFreeSpace implements IReturn<string> {
  tourId: string;

  createResponse() {
    return '';
  }

  getTypeName() {
    return 'GetTourFreeSpace';
  }
}

@Route('/tourDetail/{ID}', 'GET')
export class GetTourDetail implements IReturn<TourDetail> {
  id: string;

  createResponse() {
    return new TourDetail();
  }

  getTypeName() {
    return 'GetTourDetail';
  }
}

@Route('/tours/{TourId}/teams/{TeamId}', 'POST')
export class UpsertTeam implements IReturnVoid {
  tourId: string;
  teamId: string;
  buyer: Person;
  passengers: TeamMember[];
  infantPrice: number;
  basePrice: number;
  totalPrice: number;

  createResponse(): void {
  }

  // @DataContract
  getTypeName(): string {
    return ('UpsertTeam');
  }
}

@Route('/tours/{TourId}/passengers/toTour/{DestTourId}/{AgencyId}', 'POST')
export class PassengerReplacement implements IReturn<TourTeamMember> {
  tourId: string;
  destTourId: string;
  agencyId: string;
  passengers: TeamMember[]

  createResponse() {
    return new TourTeamMember();
  }

  // @DataContract
  getTypeName(): string {
    return 'PassengerReplacement';
  }
}

@Route('/team', 'PUT')
export class UpdateTeam {
  team: Block;
}

@Route('/destinationList')
export class GetPlaces extends QueryDb<Place> implements IReturn<QueryResponse<Place>> {
  createResponse() {
    return new QueryResponse<Place>();
  }

  getTypeName() {
    return 'GetPlaces';
  }
}

@Route('/post/', 'POST')
export class PostPlace {
  place: Place;
}

@Route('/place', 'PUT')
export class PutPlace {
  place: Place;
}

@Route('/person/team', 'POST')
export class AddPersonToTeam {
  teamPerson: TeamPerson;
}

@Route('/persons/team', 'PUT')
export class ChangePersonsTeam {
  teamPerson: TeamPerson;
}

@Route('/teams/{TeamId}/persons/', 'GET')
export class GetPersonsOfTeam implements IReturn<TeamPassenger> {
  teamId: string;

  createResponse() {
    return new TeamPassenger();
  }

  getTypeName() {
    return 'GetPersonsOfTeam';
  }
}


@Route('/tour/{TourId}/persons/', 'GET')
export class GetPersonsOfTour implements IReturn<TourPassenger> {
  tourId: string;

  createResponse() {
    return new TourPassenger();
  }

  getTypeName() {
    return 'GetPersonsOfTour';
  }
}

@Route('/persons/', 'POST')
export class AddNewPerson implements IReturn<Person> {
  person: Person;

  createResponse() {
    return <Person>{};
  }

  getTypeName() {
    return 'AddNewPerson';
  }
}

@Route('/persons/leaders', 'POST')
export class UpsertLeader implements IReturn<Person> {
  person: Person;

  createResponse() {
    return <Person>{};
  }

  getTypeName() {
    return 'UpsertLeader';
  }
}

@Route('/persons/leaders/{Id}', 'DELETE')
export class DeleteLeader implements IReturnVoid {
  id: string;

  createResponse(): void {
  }

  getTypeName() {
    return 'DeleteLeader';
  }
}

@Route('/persons/', 'PUT')
export class UpdatePerson implements IReturn<Person> {
  person: Person;

  createResponse() {
    return <Person>{};
  }

  getTypeName() {
    return 'UpdatePerson';
  }
}

@Route('/persons/', 'GET')
@Route('/persons/{id}', 'GET')
export class GetPersons extends QueryDb<Person> implements IReturn<QueryResponse<Person>> {
  id: string;

  createResponse() {
    return new QueryResponse<Person>();
  }

  getTypeName() {
    return 'GetPersons';
  }
}

@Route('/persons/{ID}', 'DELETE')
export class DeletePerson {
  id: string;
}

@Route('/persons/nc/{NationalCode}', 'GET')
export class FindPersonFromNc implements IReturn<Person> {
  nationalCode: string;

  createResponse() {
    return <Person>{};
  }

  getTypeName() {
    return 'FindPersonFromNc';
  }
}

@Route('/persons/search/{Str}/agency{AgencyId}/', 'GET')
@Route('/persons/search/{Str}', 'GET')
export class FindPersonInAgency extends QueryDb<Person> implements IReturn<QueryResponse<Person>> {
  agencyId: string;
  str: string;

  createResponse() {
    return new QueryResponse<Person>();
  }

  getTypeName() {
    return 'FindPersonInAgency';
  }
}

@Route('/persons/leaders', 'GET')
export class GetLeaders extends QueryDb<Person> implements IReturn<QueryResponse<Person>> {
  createResponse() {
    return new QueryResponse<Person>();
  }

  getTypeName() {
    return 'GetLeaders';
  }
}

@Route('/persons/register')
export class RegisterPerson implements IReturn<Block> {
  tourId: string;
  buyerId: string;
  passengersId: string[];

  createResponse() {
    return new Block();
  }

  getTypeName() {
    return 'RegisterPerson';
  }
}

@Route('/persons/current', 'GET')
export class GetCurrentPerson implements IReturn<Person> {
  createResponse() {
    return <Person>{};
  }

  getTypeName() {
    return 'GetCurrentPerson';
  }
}

@Route('/notify/agency/tour/{TourId}/role/{Role}', 'POST')
export class SendNotifyToTourAgencies {
  tourId: string;
  role: Role;
  msg: string;
}

@Route('/notify/tour/{TourId}/buyers/', 'POST')
export class SendNotifyToTourBuyers {
  tourId: string;
  msg: string;
}

@Route('/notify/tour/{TourId}/passengers/', 'POST')
export class SendNotifyToTourPassengers {
  tourId: string;
  msg: string;
}

@Route('/notify/tour/{TourId}/leader', 'POST')
export class SendNotifyToTourLeader {
  tourId: string;
  msg: string;
}

@Route('/destinations/{Id}', 'GET')
@Route('/destinations', 'GET')
export class GetDestinations extends QueryDb<Destination> implements IReturn<QueryResponse<Destination>> {
  id: string;

  createResponse() {
    return new QueryResponse<Destination>();
  }

  getTypeName() {
    return 'GetDestinations';
  }
}

@Route('/destination/', 'POST')
export class CreateDestination implements IReturn<Destination> {
  destination: Destination;

  createResponse() {
    return new Destination();
  }

  getTypeName() {
    return 'CreateDestination';
  }
}

@Route('/destination/', 'PUT')
export class UpdateDestination {
  destination: Destination;
}

@Route('/agencies/persons/', 'GET')
export class GetPersonOfAgency extends QueryDb<Person> implements IReturn<QueryResponse<Person>> {
  // @Ignore()
  agencyId: string;

  createResponse() {
    return new QueryResponse<Person>();
  }

  getTypeName() {
    return 'GetPersonOfAgency';
  }
}

@Route('/agencies/persons', 'POST')
export class AddPersonToAgency implements IReturn<AgencyPerson> {
  // @Ignore()
  agencyId: string;

  personId: string;

  createResponse() {
    return new AgencyPerson();
  }

  getTypeName() {
    return 'AddPersonToAgency';
  }
}

@Route('/agencies/persons', 'PUT')
export class UpdatePersonToAgency {
  id: string;
  agencyId: string;
  personId: string;
}

@Route('/agencies/{id}', 'GET')
export class GetAgency implements IReturn<Agency> {
  id: string;

  createResponse() {
    return new Agency();
  }

  getTypeName() {
    return 'GetAgency';
  }
}

@Route('/agencies', 'POST')
export class CreateAgency implements IReturn<Agency> {
  agency: Agency;
  person: Person;

  createResponse() {
    return new Agency();
  }

  getTypeName() {
    return 'CreateAgency';
  }
}

@Route('/agencies', 'PUT')
export class UpdateAgency {
  agency: Agency;
}

@Route('/tours/{TourId}/agencies/{LoadChilds}')
export class GetTourAgency implements IReturn<Array<Tour>> {
  tourId: string;
  loadChild: boolean = false;

  createResponse() {
    return new Array<Tour>();
  }

  getTypeName(): string {
    return 'GetTourAgency';
  }
}

@Route('/agencies/{IsAll}', 'GET')
export class GetAgencies extends QueryDb<Agency> implements IReturn<QueryResponse<Agency>> {
  isAll: boolean = true;

  createResponse() {
    return new QueryResponse<Agency>();
  }

  getTypeName() {
    return 'GetAgencies';
  }
}

@Route('/agencies/find/str', 'GET')
export class FindAgency extends QueryDb<Agency> implements IReturn<QueryResponse<Agency>> {
  str: string;

  createResponse() {
    return new QueryResponse<Agency>();
  }

  getTypeName() {
    return 'FindAgency';
  }
}

@Route('/auth', 'POST')
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

  createResponse() {
    return new AuthenticateResponse();
  }

  getTypeName() {
    return 'Authenticate';
  }
}

@Route('/tours/options/{TourId}')
export class GetTourOptions extends QueryDb<TourOption> implements IReturn<QueryResponse<TourOption>> {
  tourId: string;

  createResponse() {
    return new QueryResponse<TourOption>();
  }

  getTypeName() {
    return 'GetTourOptions';
  }
}

@Route('/tours/{TourId}/teams')
export class GetTourTeams extends QueryDb<Block> implements IReturn<QueryResponse<Block>> {
  tourId: string;

  createResponse() {
    return new QueryResponse<Block>();
  }

  getTypeName() {
    return 'GetTourTeams';
  }
}

@Route('/tours/teams/{TeamId}', 'DELETE')
export class DeleteTeam implements IReturnVoid {
  teamId: string;

  createResponse(): void {
  }

  getTypeName() {
    return 'DeleteTeam';
  }
}

@Route('/tours/{OldTourId}/teams/list', 'PUT')
export class PassengerReplacementTeamAccomplish implements IReturnVoid {

  oldTourId: string;

  teams: Team[];

  createResponse(): void {
  }

  getTypeName() {
    return 'PassengerReplacementTeamAccomplish';
  }
}

@Route('/tours/{TourId}/{oldTourId}/accomplish', 'PUT')
export class PassengerReplacementTourAccomplish implements IReturnVoid {

  oldTourId: string;
  tourId: string;
  infantPrice: number;
  basePrice: number;
  busPrice: number;
  foodPrice: number;
  roomPrice: number;

  createResponse(): void {
  }

  getTypeName() {
    return 'PassengerReplacementTourAccomplish';
  }
}

@Route('/tours/{TourId}/tickets', 'GET')
export class GetTourTicket implements IReturn<TourPassengers> {

  tourId: string;

  createResponse() {
    return new TourPassengers();
  }

  getTypeName() {
    return 'GetTourTicket';
  }
}

@Route('/tours/{TourId}/visa/{Have}', 'GET')
export class GetTourVisa implements IReturn<TourPassengers> {

  tourId: string;
  have: boolean = true;

  createResponse() {
    return new TourPassengers();
  }

  getTypeName() {
    return 'GetTourVisa';
  }
}

@Route('/tours/{TourId}/buyers', 'GET')
export class GetTourBuyers implements IReturn<Array<TourBuyer>> {

  tourId: string;

  createResponse() {
    return new Array<TourBuyer>();
  }

  getTypeName() {
    return 'GetTourBuyers';
  }
}
@Route("/download/ticketReportTemplate", "GET")
export class GetTicketReportTemplate implements IReturn<HttpResult>
{
  createResponse() { return new HttpResult(); }
  getTypeName() { return "GetTicketReportTemplate"; }
}
