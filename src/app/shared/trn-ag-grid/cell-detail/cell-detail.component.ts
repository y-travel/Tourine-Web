import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridOptions, ICellRendererParams } from 'ag-grid';
import { IDetailCellRendererParams } from 'ag-grid-enterprise/dist/lib/rendering/detail/detailCellRenderer';
import { CellHeaderComponent } from '../cell-header/cell-header.component';

@Component({
  selector: 'app-cell-detail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.scss']
})
export class CellDetailComponent implements ICellRendererAngularComp {
  params: any;
  rowData: any;
  columnDefs: any;
  gridOptions: GridOptions;

  constructor() {
    this.init();
  }

  init() {
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };
  }

  refresh(params: any): boolean {
    return false;
  }

  agInit(params: ICellRendererParams | IDetailCellRendererParams | any): void {
    this.params = params;
    this.columnDefs = params.detailGridOptions.columnDefs;
  }

  onGridReady(params) {
    this.params.getDetailRowData(params, this.params);
  }
}
