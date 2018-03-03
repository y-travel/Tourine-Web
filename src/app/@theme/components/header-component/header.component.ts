import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular/dist/interfaces';
import { IHeaderParams } from 'ag-grid';

@Component({
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements IHeaderAngularComp {
  params: IHeaderParams;

  constructor() {
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
  }
}
