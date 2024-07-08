import { Inject, Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { ApiService } from '../data/api.service';
import { Agency, Person, User } from '../data/models';
import { AppUtils, UTILS } from './app-utils';
import { APP_CONFIG, AppConfig } from './app.config';
import { Authenticate, GetCurrentPerson } from '../data/models/server.dtos';
import { Serializable } from './serializable';

@Injectable()
export class AuthService {

  person: Person;
  agency: Agency;

  constructor(private apiService: ApiService,
              @Inject(UTILS) private utils: AppUtils,
              @Inject(APP_CONFIG) private config: AppConfig) {
  }

  isAuthenticated() {
    return this.config.isDev() || !this.utils.isNullOrUndefined(this.person);
  }

  async authorize(user?: User) {
    if (user) {
      if (!await this.authenticate(user)) {
        throw new Error('user not found');
      }
    }

    const dto = new GetCurrentPerson();
    return await this.apiService.send(dto).pipe(map(person => {
      this.person = Object.assign(<Person>{}, person);
      return this.isAuthenticated();
    }), first()).toPromise().catch(() => undefined);
  }

  async authenticate(user: User) {
    const auth = new Authenticate();
    auth.userName = user.username;
    auth.password = user.password;
    auth.rememberMe = true;
    auth.useTokenCookie = true;
    auth.provider = 'credentials';
    const result = await this.apiService
      .send(auth)
      .pipe(map(res => {
        this.person = Object.assign(<Person>{}, res);
        this.agency = Serializable.fromJSONToType(Agency, res);
        return this.isAuthenticated();
      }), first())
      .toPromise().catch(() => undefined);
    return result;
  }
}
