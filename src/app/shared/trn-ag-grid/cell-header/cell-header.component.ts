import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular/dist/interfaces';
import { IHeaderParams } from 'ag-grid';

@Component({
  selector: 'trn-cell-header',
  templateUrl: 'cell-header.component.html',
  styleUrls: ['cell-header.component.scss']
})
export class CellHeaderComponent implements IHeaderAngularComp {
  params: any;

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
  }
}
