import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../@core/data/form.service';
import { AuthService } from '../../../@core/utils/auth.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { User } from '../../../@core/data/models';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../@core/utils/spinner.service';

@Component({
  selector: 'trn-login',
  templateUrl: './login.component.gen.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formService: FormService<User>;
  errorMessage: string;

  constructor(public formFactory: FormFactory,
              private spinnerService: SpinnerService,
              public authService: AuthService,
              private router: Router) {
    this.formService = this.formFactory.createLoginForm();
  }

  ngOnInit() {
    this.spinnerService.load();
  }

  login() {
    if (this.formService.form.invalid) {
      return;
    }
    this.authService.authorize(this.formService.model)
      .then(() => this.router.navigate(['/pages'])
        , () => this.errorMessage = 'msg.invalidUsernameOrPassword');
  }
}
