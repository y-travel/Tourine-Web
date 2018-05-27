import { Injectable } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid';
import { AgGridNg2 } from 'ag-grid-angular';

import { TourService } from '../../@core/data/tour.service';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Dictionary, Place } from '../../@core/data/models';
import { FormatterService } from '../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Agency, Tour } from '../../@core/data/models/client.model';
import { CellToolbarComponent, ToolbarItem } from '../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';

@Injectable()
export class TourGridService {
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
  blocks: Tour[];
  icons: any;
  toolbarTourItems: ToolbarItem[] = [];
  toolbarBlockItems: ToolbarItem[] = [];
  currentRow: Tour;
  currentRowDetailApi: GridApi;

  getRowNodeId;

  constructor(private tourService: TourService,
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
        valueGetter: (params: any) => ' ',
        maxWidth: 40,
        minWidth: 40,
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'row',
        field: 'id',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
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
            valueGetter: (params: any) => params.data.freeSpace,
          },
        ],
        minWidth: 100,
        maxWidth: 150,
      },
      {
        headerName: 'hotel',
        field: 'tourDetail.placeId',
        minWidth: 100,
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
          items: this.toolbarTourItems,
        },
        minWidth: 250,
        maxWidth: 250,
      },
    ];

    this.getRowNodeId = function (data) {
      return data.id;
    };

    this.detailCellRenderer = 'cellDetail';
    this.frameworkComponents = {cellDetail: CellDetailComponent, cellToolbar: CellToolbarComponent, cellHeader: CellHeaderComponent};
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'row',
            field: 'id',
            minWidth: 50,
            maxWidth: 50,
            cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
          },
          {
            headerName: 'buyer.names',
            field: 'agencyId',
            cellRenderer: (params: any) => this.agencies[params.value],
          },
          {
            headerName: 'capacity.*',
            headerGroupComponent: 'cellHeader',
            children: [
              {
                headerName: 'capacity.reserved',
                field: 'capacity',
                valueGetter: (params: any) => params.data.parentId
                  ? params.data.capacity
                  : '--',
              },
              {
                headerName: 'capacity.noName',
                field: 'freeSpace',
              },
            ],
          },
          {
            headerName: 'price.*',
            field: 'basePrice',
            cellRenderer: (params: any) => this.formatter.getPriceFormat(params.value),
          },
          {
            cellRenderer: 'cellToolbar',
            minWidth: 200,
            maxWidth: 200,
            cellRendererParams: {
              items: this.toolbarBlockItems,
            },
          },
        ],
        onGridReady: (detailParams: any, parentParams: any = null) => {
          this.currentRow = parentParams.data;
          this.currentRowDetailApi = detailParams.api;
          this.reloadBlocks();
        },
      },
      frameworkComponents: {cellToolbar: CellToolbarComponent, cellHeader: CellHeaderComponent},
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

  initToolbar(sharedItems: ToolbarItem[], tourItems: ToolbarItem[], blockItems: ToolbarItem[]) {
    this.toolbarTourItems.push(...tourItems, ...sharedItems);
    this.toolbarBlockItems.push(...blockItems, ...sharedItems);
  }

  reloadBlocks(tour = this.currentRow) {
    this.tourService.getBlocks(tour).subscribe(blocks => {
      this.blocks = blocks;
      this.currentRowDetailApi.setRowData(this.blocks);
      this.currentRowDetailApi.sizeColumnsToFit();
    });
  }
}
