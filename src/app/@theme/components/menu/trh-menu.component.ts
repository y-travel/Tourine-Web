import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'trh-menu',
  templateUrl: './trh-menu.component.html',
  styleUrls: ['./trh-menu.component.scss']
})
export class TrhMenuComponent implements OnInit {

  @Input() items = [];

  constructor() {
  }

  ngOnInit() {
  }

}
