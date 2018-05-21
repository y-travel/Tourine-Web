import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';

describe('Auth Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('isAuthenticated should return proper value depend on person exist', () => {
    const auth = TestBed.get(AuthService);
    auth.config.isDev = () => false;

    auth.person = null;
    expect(auth.isAuthenticated()).toBe(false);
    auth.person = {};
    expect(auth.isAuthenticated()).toBe(true);
  });
});
