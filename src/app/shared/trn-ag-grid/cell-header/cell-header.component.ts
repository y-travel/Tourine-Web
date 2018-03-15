import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular/dist/interfaces';
import { IHeaderParams } from 'ag-grid';

@Component({
  selector: 'app-cell-header',
  templateUrl: 'cell-header.component.html',
  styleUrls: ['cell-header.component.scss']
})
export class CellHeaderComponent implements IHeaderAngularComp {
  params: IHeaderParams;

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
  }
}
