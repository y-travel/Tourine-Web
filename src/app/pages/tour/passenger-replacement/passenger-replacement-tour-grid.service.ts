import { Inject, Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { AgGridNg2 } from 'ag-grid-angular';

import { TourService } from '../../../@core/data/tour.service';
import { CellHeaderComponent } from '../../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Dictionary, Place } from '../../../@core/data/models';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Agency, Tour } from '../../../@core/data/models/client.model';
import { CellToolbarComponent, ToolbarItem } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';

@Injectable()
export class PassengerReplacementTourGridService {
  gridOptions: GridOptions;
  columnDefs: any[];
  frameworkComponents: any;
  detailCellRenderer: any;
  detailCellRendererParams: any;
  places: Dictionary<string> = {};
  agencies: Dictionary<string> = {};
  gridApi: any;
  grid: AgGridNg2;
  rows: Tour[];
  icons: any;
  toolbarBlockItems: ToolbarItem[] = [];
  sourceTourId: string;

  constructor(private tourService: TourService,
              @Inject(UTILS) private utils: AppUtils,
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
        valueFormatter: (params: any) => this.formatter.getDateFormat(params.value),
      },
      {
        headerName: 'capacity.*',
        headerGroupComponent: 'cellHeader',
        children: [
          {
            headerName: 'capacity.all',
            field: 'capacity',
          },
          {
            headerName: 'capacity.remained',
            field: 'freeSpace',
          },
        ],
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'hotel',
        field: 'tourDetail.placeId',
        minWidth: 150,
        maxWidth: 150,
        cellRenderer: (params: any) => this.places[params.value],
      },
      {
        headerName: 'price.*',
        field: 'basePrice',
        cellRenderer: (params: any) => this.formatter.getPriceFormat(params.value),
      },
      {
        cellRenderer: 'cellToolbar',
        cellRendererParams: {
          items: this.toolbarBlockItems,
        },
      },
    ];

    this.frameworkComponents = {
      cellDetail: CellDetailComponent,
      cellToolbar: CellToolbarComponent,
      cellHeader: CellHeaderComponent
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
  }

  reloadData() {
    if (this.utils.isNullOrEmpty(this.sourceTourId)) {
      throw new Error('Source tour should not be null');
    }
    this.tourService.getList().subscribe(tours => {
      this.rows = tours.filter(x => x.id !== this.sourceTourId);
      this.gridApi.setRowData(this.rows);
      this.gridApi.sizeColumnsToFit();
    });
  }

  setSourceTourId(tourId: string) {
    this.sourceTourId = tourId;
  }

  initToolbar(BlockItems: ToolbarItem[]) {
    this.toolbarBlockItems.push(...BlockItems);
  }
}
