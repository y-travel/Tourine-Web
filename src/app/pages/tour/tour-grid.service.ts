import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { TourService } from '../../@core/data/tour.service';
import { HeaderComponent } from '../../@theme/components/header-component/header.component';
import { Dictionary, Place } from '../../@core/data/models';
import { FormatterService } from '../../@core/utils/formatter.service';
import { extractStyleParams } from '@angular/animations/browser/src/util';

@Injectable()
export class TourGridService {
  gridOptions: GridOptions;
  rowData: any[];
  columnDefs: any[];
  detailCellRendererParams: any;
  places: Dictionary<string> = {};
  gridApi: any;

  constructor(private tourService: TourService,
              private translate: TranslateService,
              private formatter: FormatterService) {
    this.init();
  }

  init() {
    this.loadPlaces();
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
      },
    };
    this.columnDefs = [
      {
        headerName: 'tour.code',
        field: 'code',
      },
      {
        headerName: 'tour.date',
        field: 'tourDetail.startDate',
        cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
      },
      {
        headerName: 'tour.capacity',
        field: 'capacity',
      },
      {
        headerName: 'price',
        field: 'basePrice',
        cellRenderer: (params: any) => this.formatter.getPriceFormat(params.value),
      },
      {
        headerName: 'hotel',
        field: 'tourDetail.placeId',
        cellRenderer: (params) => this.places[params.value],
      },
    ];

    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {field: 'callId'},
          {field: 'direction'},
          {field: 'number'},
          {
            field: 'duration',
            valueFormatter: 'x.toLocaleString() + \'s\''
          },
          {field: 'switchCode'}
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

  loadPlaces() {
    this.tourService.getPlaces().subscribe((places: Place[]) => {
      places.forEach(place => this.places[place.id] = place.name);
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.reloadData();
  }

  reloadData() {
    this.tourService.getList().subscribe(tours => {
      this.gridApi.setRowData(tours);
    });
  }
}
