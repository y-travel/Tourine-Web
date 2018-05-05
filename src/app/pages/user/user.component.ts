import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../@core/utils/spinner.service';
import { AuthService } from '../../@core/utils/auth.service';

@Component({
  selector: 'app-user',
  template: `
    <tourine-layout layoutType="layout2">
      <div class="layout2-content">
        <router-outlet></router-outlet>
      </div>
    </tourine-layout>`,
})
export class UserComponent implements OnInit {

  constructor(private router: Router,
              private spinnerService: SpinnerService,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.spinnerService.registerLoader(
      this.authService.authorize().then(res => {
        if (res)
          this.router.navigate(['/pages']);
        else
          this.router.navigate(['/user/login']);
      }, () => console.log('failed'))
    );
  }

}
