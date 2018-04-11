import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'person',
  template: `<router-outlet></router-outlet>`,
})
export class PersonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
