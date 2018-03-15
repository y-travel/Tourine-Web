import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { TourService } from '../../@core/data/tour.service';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Dictionary, Place } from '../../@core/data/models';
import { FormatterService } from '../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Agency, Tour } from '../../@core/data/models/client.model';
import { AgGridNg2 } from 'ag-grid-angular';

@Injectable()
export class TourGridService {
  gridOptions: GridOptions;
  rowData: any[];
  columnDefs: any[];
  frameworkComponents: any;
  detailCellRenderer: any;
  detailCellRendererParams: any;
  places: Dictionary<string> = {};
  agencies: Dictionary<string> = {};
  gridApi: any;
  grid: AgGridNg2;
  rows: Tour[];
  blocks: Tour[];
  icons: any;

  constructor(private tourService: TourService,
              private translateService: TranslateService,
              private formatter: FormatterService) {
    this.init();
  }

  preLoad() {
    this.loadPlaces();
    this.loadAgencies();
  }

  init() {
    this.preLoad();
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };
    this.columnDefs = [
      {
        headerName: '',
        maxWidth: 25,
        minWidth: 25,
        checkboxSelection: true,
      }, {
        headerName: '',
        valueGetter: (params: any) => ' ',
        maxWidth: 40,
        minWidth: 40,
        cellRenderer: 'agGroupCellRenderer',
      }, {
        headerName: 'row',
        field: 'id',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => {
          return `${this.rows.findIndex(tour => tour.id === params.value) + 1}`;
        },
      }, {
        headerName: 'tour.code',
        field: 'code',
        minWidth: 150,
        maxWidth: 200,
      },
      {
        headerName: 'tour.date',
        minWidth: 150,
        maxWidth: 200,
        field: 'tourDetail.startDate',
        cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
      },
      {
        headerName: 'capacity',
        minWidth: 100,
        maxWidth: 150,
        field: 'capacity',
      },
      {
        headerName: 'hotel',
        field: 'tourDetail.placeId',
        minWidth: 100,
        maxWidth: 150,
        cellRenderer: (params: any) => this.places[params.value],
      }, {
        headerName: 'price',
        field: 'basePrice',
        cellRenderer: (params: any) => this.formatter.getPriceFormat(params.value),
      },
    ];

    this.detailCellRenderer = 'cellDetail';
    this.frameworkComponents = {cellDetail: CellDetailComponent};
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'row',
            field: 'id',
            minWidth: 50,
            maxWidth: 50,
            cellRenderer: (params: any) => {
              return `${this.blocks.findIndex(tour => tour.id === params.value) + 1}`;
            },
          },
          {
            headerName: 'agencyName',
            field: 'agencyId',
            headerComponentFactory: <{ new(): CellHeaderComponent }>CellHeaderComponent,
            cellRenderer: (params: any) => this.agencies[params.value],
          },
          {
            headerName: 'capacity',
            field: 'capacity',
          },
          {
            headerName: 'price',
            field: 'basePrice',
            cellRenderer: (params: any) => this.formatter.getPriceFormat(params.value),
          },
        ],
        onGridReady: (detailParams: any, parentParams: any = null) => {
          this.tourService.getBlocks(parentParams.data.id).subscribe(blocks => {
            this.blocks = blocks;
            detailParams.api.setRowData(this.blocks);
            detailParams.api.sizeColumnsToFit();
          });
        },
      },
    };
    this.icons = {
      groupExpanded: '<i class="material-icons">keyboard_arrow_down</mat-icon>',
      groupContracted: '<i class="material-icons">keyboard_arrow_left</i>',
    };
  }

  loadPlaces() {
    this.tourService.getPlaces().subscribe((places: Place[]) => {
      places.forEach(place => this.places[place.id] = place.name);
    });
  }

  loadAgencies() {
    this.tourService.getAgencies().subscribe((agencies: Agency[]) => {
      agencies.forEach(agency => this.agencies[agency.id] = agency.name);
    });
  }

  refresh() {
    this.gridApi.refreshView();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.reloadData();
    this.setInitialLayout(this.gridApi);
  }

  setInitialLayout(api) {
    api.sizeColumnsToFit();
    setTimeout(function () {
      api.forEachNode(function (node) {
        node.setExpanded();
      });
    }, 100);
  }

  reloadData() {
    this.tourService.getList().subscribe(tours => {
      this.rows = tours;
      this.gridApi.setRowData(this.rows);
    });
  }
}
