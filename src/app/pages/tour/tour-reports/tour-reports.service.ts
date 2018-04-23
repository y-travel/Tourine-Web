import { Inject, Injectable } from '@angular/core';
import { TourService } from '../../../@core/data/tour.service';
import { GridOptions } from 'ag-grid';
import { PersonService } from '../../../@core/data/person.service';
import { TranslateService } from '@ngx-translate/core';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { CellHeaderComponent } from '../../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Person, Ticket } from '../../../@core/data/models/client.model';

declare type ReportTab = 'ticket' | 'visa' | 'buyer' | 'tour';

@Injectable()
export class TourReportGridService {

  gridOptions: GridOptions;
  gridColumnApi: any;
  rows: Person[];
  selectedTourId: string;
  columnDefs: any[];
  frameworkComponents: any;
  gridApi: any;

  constructor(public personService: PersonService,
              public tourservice: TourService,
              private translate: TranslateService,
              private formatter: FormatterService,
              @Inject(UTILS) private utils: AppUtils,) {
    this.init();
  }

  init() {
    this.changeColumn('ticket')
  }

  changeColumn(tab: ReportTab) {

    this.rows = [];
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };

    this.columnDefs = [
      {
        headerName: 'row',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'person.nameAndFamily',
        maxWidth: 300,
        valueGetter: (params: any) => ' ' + params.data.name + ' ' + params.data.family,
        valueFormatter: (params: any) => {
          return params.data.gender ?
            this.translate.instant('maleTitle') + params.value :
            this.translate.instant('femaleTitle') + params.value;
        }
      },
      {
        headerName: 'person.englishNameAndFamily',
        maxWidth: 300,
        valueGetter: (params: any) => ' ' + params.data.englishName + ' ' + params.data.englishFamily,
      },
      {
        headerName: 'passportNumber',
        field: 'passportNo',
        minWidth: 120,
        maxWidth: 120,
      },

      {
        headerName: '',
        field: 'isInfant',
        minWidth: 1,
        maxWidth: 1,
      },
      {
        headerName: '',
      },
    ];

    this.frameworkComponents = {
      cellHeader: CellHeaderComponent,
    };

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setRowData(this.rows);
    this.setInitialLayout(this.gridApi);
  }

  setInitialLayout(api: any) {
    api.sizeColumnsToFit();
  }

  refresh() {
    this.gridApi.refreshCells();
    this.gridApi.sizeColumnsToFit();
  }

  setRow(row: any) {
    this.rows = row;
    this.gridApi.setRowData(this.rows);
  }
}

