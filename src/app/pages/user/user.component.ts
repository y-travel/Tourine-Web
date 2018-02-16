import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <tourine-layout layoutType="layout2">
      <div class="layout2-content">
        <router-outlet ></router-outlet>
      </div>
    </tourine-layout>`,
})
export class UserComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
