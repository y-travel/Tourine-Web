import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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

  constructor(private router: Router) {
  }

  ngOnInit() {
    //@TODO impl auto connect and showing spinner
    this.router.navigate(['/user/login']);
  }

}
