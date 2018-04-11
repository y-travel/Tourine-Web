import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  items: ToolBarItem[]

  constructor() {
  }

  ngOnInit() {
  }
}

export class ToolBarItem {
  icon = 'border_clear';
  color: string;
  command: () => void;
  commandParams: any[];
}
