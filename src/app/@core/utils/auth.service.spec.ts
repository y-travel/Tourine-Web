import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { expect } from '@angular-devkit/build-optimizer/src/transforms/scrub-file';

describe('Auth Service', () => {

  TestBed.configureTestingModule({
    imports: [AuthService]
  });

  const auth = TestBed.get(AuthService);
  auth.config.isDev = () => false;

  it('isAuthenticated should return proper value depend on person exist', () => {
    auth.person = null;
    expect(auth.isAuthenticated()).toBe(false);
    auth.person = {};
    expect(auth.isAuthenticated()).toBe(true);
  });
});
