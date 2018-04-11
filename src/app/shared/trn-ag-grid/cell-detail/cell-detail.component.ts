import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgGridNg2, ICellRendererAngularComp } from 'ag-grid-angular';
import { GridOptions, ICellRendererParams } from 'ag-grid';
import { IDetailCellRendererParams } from 'ag-grid-enterprise/dist/lib/rendering/detail/detailCellRenderer';
import { CellHeaderComponent } from '../cell-header/cell-header.component';

@Component({
  selector: 'app-cell-detail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.scss']
})
export class CellDetailComponent implements ICellRendererAngularComp, AfterViewInit {
  params: any;
  rowData: any;
  columnDefs: any;
  gridOptions: GridOptions;
  @ViewChild('agGrid') grid: AgGridNg2;

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

  ngAfterViewInit(): void {
    setTimeout(() => this.refreshView(), 100);
  }

  refresh(params: any): boolean {
    return true;
  }

  agInit(params: ICellRendererParams | IDetailCellRendererParams | any): void {
    this.params = params;
    this.columnDefs = params.detailGridOptions.columnDefs;
  }

  onGridReady(params) {
    this.params.getDetailRowData(params, this.params);
  }

  refreshView() {
    this.grid.api.sizeColumnsToFit();
  }
}
