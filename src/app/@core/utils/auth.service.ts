import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ApiService } from "../data/api.service";
import { Authenticate, Person, User } from "../data/models";
import { Utils } from "./utils";
import { Serializable } from "./serializable";

@Injectable()
export class AuthService {

  person: Person;

  constructor(private apiService: ApiService, private utils: Utils) {
  }

  isAuthenticated() {
    return !this.utils.isNullorUndefined(this.person);
  }

//@TODO Person info should be impl.
  authenticate(user: User): Observable<any> {
    const auth = new Authenticate();
    auth.UserName = user.username;
    auth.Password = user.password;
    auth.RememberMe = true;
    auth.provider = "credentials";
    return this.apiService.send(auth).map(res => {
      this.person = Serializable.fromJSONToType(Person, res);
      return this.isAuthenticated();
    });
  }
}
