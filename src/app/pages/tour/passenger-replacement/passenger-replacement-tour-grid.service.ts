import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { TourService } from '../../../@core/data/tour.service';
import { CellHeaderComponent } from '../../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Dictionary, Place } from '../../../@core/data/models';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Agency, Tour, Destination } from '../../../@core/data/models/client.model';
import { AgGridNg2 } from 'ag-grid-angular';
import { CellToolbarComponent, ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';

@Injectable()
export class PassengerReplacementTourGridService {
  gridOptions: GridOptions;
  columnDefs: any[];
  frameworkComponents: any;
  detailCellRenderer: any;
  detailCellRendererParams: any;
  places: Dictionary<string> = {};
  agencies: Dictionary<string> = {};
  dest: Dictionary<string> = {};
  gridApi: any;
  grid: AgGridNg2;
  rows: Tour[];
  blocks: Tour[];
  icons: any;
  toolbarTourItems: ToolbarItem[] = [];
  toolbarBlockItems: ToolbarItem[] = [];

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

      },
      {
        headerName: 'row',
        field: 'id',
        minWidth: 25,
        maxWidth: 25,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
        getQuickFilterText: (params: any) => (params.node.rowIndex + 1).toString(),
      }, {
        headerName: 'tour.code',
        field: 'code',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'tour.date',
        minWidth: 100,
        maxWidth: 100,
        field: 'tourDetail.startDate',
        getQuickFilterText: (params: any) => {
          var str =  this.formatter.getDateFormat(params.value);
          return str;
        },
        valueFormatter: (params: any) => this.formatter.getDateFormat(params.value),
      },
      {
        headerName: 'capacity.*',
        minWidth: 100,
        maxWidth: 100,
        field: 'capacity',
      },
      {
        headerName: 'hotel',
        field: 'tourDetail.placeId',
        minWidth: 150,
        maxWidth: 150,
        cellRenderer: (params: any) => this.places[params.value],
        getQuickFilterText: (params: any) => this.places[params.value],
      }, {
        headerName: 'price.*',
        field: 'basePrice',
        cellRenderer: (params: any) => this.formatter.getPriceFormat(params.value),
      },
    ];

    this.frameworkComponents = { cellDetail: CellDetailComponent, cellToolbar: CellToolbarComponent };
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

  loadDest() {
    this.tourService.getDistinations().subscribe((res: Destination[]) => {
      res.forEach(d => this.dest[d.id] = d.name);
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

  setInitialLayout(api: any) {
    api.sizeColumnsToFit();
    setTimeout(function () {
      api.forEachNode(function (node: any) {
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
