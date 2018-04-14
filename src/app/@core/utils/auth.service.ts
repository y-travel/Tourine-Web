import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { ApiService } from "../data/api.service";
import { Authenticate, Person, User, Agency } from "../data/models";
import { AppUtils, UTILS } from "./app-utils";
import { Serializable } from "./serializable";

@Injectable()
export class AuthService {

  person: Person;
  agency: Agency;

  constructor(private apiService: ApiService, @Inject(UTILS) private utils: AppUtils) {
  }

  isAuthenticated() {
    return !this.utils.isNullOrUndefined(this.person);
  }

  //@TODO Person info should be impl.
  authenticate(user: User): Observable<any> {
    const auth = new Authenticate();
    auth.userName = user.username;
    auth.password = user.password;
    auth.rememberMe = true;
    auth.useTokenCookie = true;
    auth.provider = "credentials";
    return this.apiService.send(auth).map(res => {
      this.person = Serializable.fromJSONToType(Person, res);
      this.agency = Serializable.fromJSONToType(Agency,res);
      return this.isAuthenticated();
    });
  }
}
