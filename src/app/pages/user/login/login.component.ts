import { Component, OnInit } from '@angular/core';
import { FormService } from "../../../@core/data/form.service";
import { AuthService } from "../../../@core/utils/auth.service";
import { FormFactory } from "../../../@core/data/models/form-factory";
import { User } from "../../../@core/data/models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formService: FormService<User>;
  errorMessage: string;

  constructor(public formFactory: FormFactory,
              public authService: AuthService,
              private router: Router) {
    this.formService = this.formFactory.createLoginForm();
  }

  ngOnInit() {
  }

  login() {
    if (this.formService.form.invalid)
      return;
    this.authService
      .authenticate(this.formService.model)
      .subscribe(res => {
        if (res)
          this.router.navigate(['/pages']);
      }, error => {
        this.errorMessage = "msg.invalidUsernameOrPassword";
      });
  }
}
