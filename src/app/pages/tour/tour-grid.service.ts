import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { TourService } from '../../@core/data/tour.service';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Dictionary, Place } from '../../@core/data/models';
import { FormatterService } from '../../@core/utils/formatter.service';
import { extractStyleParams } from '@angular/animations/browser/src/util';

@Injectable()
export class TourGridService {
  gridOptions: GridOptions;
  rowData: any[];
  columnDefs: any[];
  frameworkComponents: any;
  detailCellRenderer: any;
  detailCellRendererParams: any;
  places: Dictionary<string> = {};
  gridApi: any;
  detailCellRendererFramework: any;

  constructor(private tourService: TourService,
              private translate: TranslateService,
              private formatter: FormatterService) {
    this.init();
  }

  init() {
    this.loadPlaces();
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };
    this.columnDefs = [
      {
        headerName: 'tour.code',
        field: 'code',
        cellRenderer: 'agGroupCellRenderer',
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
        cellRenderer: (params: any) => this.places[params.value],
      },
    ];

    this.detailCellRenderer = 'mydetail';
    this.frameworkComponents = {mydetail: CellHeaderComponent};
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'agency',
            field: 'agencyId',
            headerComponentFactory: <{ new(): CellHeaderComponent }>CellHeaderComponent,
          },
          {
            headerName: 'capacity',
            field: 'capacity',
          },
          {
            headerName: 'price',
            field: 'basePrice',
          },
        ],
        onGridReady: (params: any) => {
          params.api.sizeColumnsToFit();
        }
      },
      defaultColDef: {
        headerComponentFactory: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
      getDetailRowData: (params: any) => {
        this.tourService.getBlocks(params.data.id).subscribe(blocks => {
          params.successCallback(blocks);
        });
      },

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
    this.setInitialLayout(this.gridApi);
  }

  setInitialLayout(api) {
    api.sizeColumnsToFit();
    setTimeout(function () {
      let rowCount = 0;
      api.forEachNode(function (node) {
        node.setExpanded(rowCount++ === 1);
      });
    }, 500);
  }

  reloadData() {
    this.tourService.getList().subscribe(tours => {
      this.gridApi.setRowData(tours);
    });
  }
}
