import { Component, OnInit } from '@angular/core';
import { FormService } from "../../../@core/data/form.service";
import { AuthService } from "../../../@core/utils/auth.service";
import { FormFactory } from "../../../@core/data/models/form-factory";
import { User } from "../../../@core/data/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formService: FormService<User>;

  constructor(public formFactory: FormFactory, public authService: AuthService) {
    this.formService = this.formFactory.createLoginForm();
  }

  ngOnInit() {
  }

  login() {
    this.authService
      .login(this.formService.model)
      .subscribe(res => {
        console.log(res);
      });
  }
}
