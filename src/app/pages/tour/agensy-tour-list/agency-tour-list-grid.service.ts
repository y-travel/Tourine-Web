import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';

import { CellHeaderComponent } from '../../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Tour } from '../../../@core/data/models';
import { TourService } from '../../../@core/data/tour.service';
import { FormatterService } from '../../../@core/utils/formatter.service';

@Injectable()
export class AgencyTourListGridService {
  gridOptions: GridOptions;
  columnDefs: any[];
  gridApi: any;
  rows: Tour[];
  agencyId: string;

  getRowNodeId;

  constructor(private tourService: TourService,
              private formatter: FormatterService) {
    this.init();
  }

  init() {
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };
    this.columnDefs = [
      {
        headerName: 'row',
        minWidth: 50,
        cellRenderer: (params: any) => (params.node.childIndex + 1).toString(),
      },
      {
        headerName: 'tour.code',
        minWidth: 100,
      },
      {
        headerName: 'tour.date',
        field: 'tourDetail.startDate',
        minWidth: 100,
        cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
      },
      {
        headerName: 'tour.description',
        minWidth: 200,
      },
      {
        headerName: 'total',
        minWidth: 80,
      },
    ];
    this.getRowNodeId = function (data) {
      return data.id;
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.reloadData();
    this.setInitialLayout(this.gridApi);
  }

  reloadData() {
    this.tourService.getList(this.agencyId).subscribe(tours => {
      this.rows = tours;
      this.gridApi.setRowData(this.rows);
    });
  }

  setInitialLayout(api: any) {
    api.sizeColumnsToFit();
    setTimeout(() => {
      api.forEachNode((node) => {
        node.setExpanded();
      });
    }, 100);
  }

  setAgencyId(agencyId: string) {
    this.agencyId = agencyId;
  }
}
