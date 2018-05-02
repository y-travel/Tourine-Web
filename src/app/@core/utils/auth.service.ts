import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../data/api.service';
import { Agency, Authenticate, Person, User } from '../data/models';
import { AppUtils, UTILS } from './app-utils';
import { Serializable } from './serializable';
import { APP_CONFIG, AppConfig } from './app.config';

@Injectable()
export class AuthService {

  person: Person;
  agency: Agency;

  constructor(private apiService: ApiService,
              @Inject(UTILS) private utils: AppUtils,
              @Inject(APP_CONFIG) private config: AppConfig,) {
  }

  isAuthenticated() {
    return this.config.isDev() || !this.utils.isNullOrUndefined(this.person);
  }

  //@TODO Person info should be impl.
  authenticate(user: User): Observable<any> {
    const auth = new Authenticate();
    auth.userName = user.username;
    auth.password = user.password;
    auth.rememberMe = true;
    auth.useTokenCookie = true;
    auth.provider = 'credentials';
    return this.apiService.send(auth).map(res => {
      this.person = Object.assign(<Person>{}, res);

      this.agency = Serializable.fromJSONToType(Agency, res);
      return this.isAuthenticated();
    });
  }
}
