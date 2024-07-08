import { Inject, Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { FormatterService } from '../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { OptionType, Passenger } from '../../@core/data/models';
import { CellToolbarComponent, ToolbarItem } from '../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { AppUtils, UTILS } from '../../@core/utils/app-utils';
import { PersonService } from '../../@core/data/person.service';

@Injectable()
export class PassengerGridService {
  gridOptions: GridOptions;
  gridColumnApi: any;
  rows: Passenger[];

  columnDefs: any[];
  toolbarTourItems: ToolbarItem[] = [];
  frameworkComponents: any;
  detailCellRenderer: any;
  detailCellRendererParams: any;
  gridApi: any;

  constructor(public personService: PersonService,
              private translate: TranslateService,
              private formatter: FormatterService,
              @Inject(UTILS) private utils: AppUtils) {
    this.init();
  }

  init() {
    this.rows = [];
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };

    this.columnDefs = [
      {
        headerName: 'row',
        field: 'personId',
        minWidth: 30,
        maxWidth: 30,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'nationalCode',
        minWidth: 95,
        maxWidth: 95,
        field: 'person.nationalCode',
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'person.nameAndFamily',
        valueGetter: (params: any) => ' ' + params.data.person.name + ' ' + params.data.person.family,
        valueFormatter: (params: any) => {
          return params.data.person.gender ?
            this.translate.instant('maleTitle') + params.value :
            this.translate.instant('femaleTitle') + params.value;
        }
      },
      {
        headerName: 'person.birthDate',
        minWidth: 80,
        maxWidth: 80,
        field: 'person.birthDate',
        cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
      }, {
        headerName: 'passport.*',
        headerGroupComponent: 'cellHeader',
        children: [//@TODO generate iterative
          {
            headerName: 'passport.delivered',
            minWidth: 30,
            maxWidth: 30,
            cellRenderer: params => `<input type='checkbox' ${params.data.passportDelivered ? 'checked' : ''} disabled  />`
          }, {
            headerName: 'passport.expireDate',
            minWidth: 70,
            maxWidth: 70,
            field: 'person.passportExpireDate',
            cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
          },
          {
            headerName: 'passport.number',
            field: 'person.passportNo',
            hide: true,
            minWidth: 90,
            maxWidth: 90,
          }
        ],
      }, {
        headerName: 'person.visaExpireDate',
        minWidth: 80,
        maxWidth: 80,
        field: 'person.visaExpireDate',
        cellRenderer: (params: any) => params.data.hasVisa ? this.formatter.getDateFormat(params.value) : ' - ',
      },
      {
        headerName: 'options',
        headerGroupComponent: 'cellHeader',
        children: [//@TODO generate iterative
          {
            headerName: '',
            minWidth: 30,
            maxWidth: 30,
            headerComponentParams: {matIcon: this.utils.mapOptionTypeToIcon(OptionType.Room)},
            cellRenderer: params => `<input type='checkbox' ${OptionType.hasFlag(params.data.optionType, OptionType.Room) ? 'checked' : ''} disabled />`
          }, {
            headerName: '',
            minWidth: 30,
            maxWidth: 30,
            headerComponentParams: {matIcon: this.utils.mapOptionTypeToIcon(OptionType.Bus)},
            cellRenderer: params => `<input type='checkbox' ${OptionType.hasFlag(params.data.optionType, OptionType.Bus) ? 'checked' : ''} disabled />`
          }, {
            headerName: '',
            minWidth: 30,
            maxWidth: 30,
            headerComponentParams: {matIcon: this.utils.mapOptionTypeToIcon(OptionType.Food)},
            cellRenderer: params => `<input type='checkbox' ${OptionType.hasFlag(params.data.optionType, OptionType.Food) ? 'checked' : ''} disabled />`
          }
        ]
      },
      {
        minWidth: 90,
        maxWidth: 90,
        cellRenderer: 'cellToolbar',
        cellRendererParams: {
          items: this.toolbarTourItems,
        },
      },

    ];

    this.detailCellRenderer = 'cellDetail';
    this.frameworkComponents = {
      cellDetail: CellDetailComponent,
      cellToolbar: CellToolbarComponent,
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
    setTimeout(function () {
      let rowCount = 0;
      api.forEachNode(function (node: any) {
        node.setExpanded(rowCount++ === 1);
      });
    }, 500);
  }

  refresh() {
    this.gridApi.refreshView();
  }

  addItem(model: Passenger) {
    const index = this.rows.findIndex(p => p.personId === model.personId);
    if (index === -1) {
      this.rows.push(model);
    } else if (index < this.rows.length) {
      this.rows[index] = model;
    }
    this.gridApi.setRowData(this.rows);
  }

  remove(item: any) {
    const index = this.rows.indexOf(item);
    if (index <= -1) {
      return;
    }
    this.rows.splice(index, 1);
    this.gridApi.setRowData(this.rows);
  }

  setRow(row: Passenger[]) {
    this.rows = row;
  }

  initToolbar(items: ToolbarItem[]) {
    this.toolbarTourItems.push(...items);
  }
}
