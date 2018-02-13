import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ApiService } from "../data/api.service";
import { Authenticate, Customer, User } from "../data/models";

@Injectable()
export class AuthService {

  constructor(public apiService: ApiService) {
  }

//@TODO Customer info should be impl.
  login(user: User): Observable<any> {
    const auth = new Authenticate();
    auth.UserName = user.username;
    auth.Password = user.password;
    auth.RememberMe = true;
    auth.provider = "credentials";
    return this.apiService.send(auth).map(res => <Customer>{name: "aziz", family: "vazifeh"});
  }
}
