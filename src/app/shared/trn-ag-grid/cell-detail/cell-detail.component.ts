import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid';

@Component({
  selector: 'app-cell-detail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.scss']
})
export class CellDetailComponent implements ICellRendererAngularComp {
  params: any;
  rowData: any;
  columnDefs: any;

  constructor() {
  }

  refresh(params: any): boolean {
    return false  ;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.columnDefs = params.colDef;
    this.rowData = params.data.callRecords;
  }

}
