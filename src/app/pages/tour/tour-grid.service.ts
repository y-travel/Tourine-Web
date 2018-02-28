import { Injectable } from '@angular/core';
import { GridOptions } from "ag-grid";
import { TranslateService } from "@ngx-translate/core";

import { TourService } from "../../@core/data/tour.service";
import { HeaderComponent } from "../../@theme/components/header-component/header.component";

@Injectable()
export class TourGridService {
  gridOptions: GridOptions;
  rowData: any[];
  columnDefs: any[];
  detailCellRendererParams: any;

  get translation() {
    const val = this.translate.instant('tour.code');
    return val;
  }

  constructor(private tourService: TourService, private translate: TranslateService) {
    this.init();
  }

  init() {
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
        headerComponentParams: {
          menuIcon: 'fa bars',
        },
      },
    };
    this.columnDefs = [
      {
        headerName: this.translation,
        field: "code"
      },
      {
        headerName: this.translate.instant('tour.date'),
        field: "tourDetail.startDate"
      },
      {
        headerName: this.translate.instant('tour.capacity'),
        field: "capacity"
      },
      {
        headerName: this.translate.instant('price'),
        field: "basePrice"
      },
      {
        headerName: this.translate.instant('hotel'),
        field: "tourDetail.placeId"
      },
    ];

    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {field: "callId"},
          {field: "direction"},
          {field: "number"},
          {
            field: "duration",
            valueFormatter: "x.toLocaleString() + 's'"
          },
          {field: "switchCode"}
        ],
        onGridReady: function (params) {
          params.api.sizeColumnsToFit();
        }
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
      }
    };
  }

  onGridReady(params) {
    console.log("hello");
    this.tourService.getList().subscribe(res => {
      params.api.setRowData(res);
    });

  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
}
