import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { AgGridNg2 } from 'ag-grid-angular';
import { Person } from '../../@core/data/models';
import { CellToolbarComponent, ToolbarItem } from '../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { TranslateService } from '@ngx-translate/core';
import { PersonService } from '../../@core/data/person.service';
import { FormatterService } from '../../@core/utils/formatter.service';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';

@Injectable()
export class LeaderGridService {
  gridOptions: GridOptions;
  columnDefs: any[];
  toolbarItems: ToolbarItem[] = [];
  frameworkComponents: any;
  gridApi: any;
  grid: AgGridNg2;
  rows: Person[];
  icons: any;
  model: Person;

  constructor(private translateService: TranslateService,
              public personService: PersonService,
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
        field: 'personId',
        minWidth: 30,
        maxWidth: 30,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      }, {
        headerName: 'person.nc',
        minWidth: 100,
        maxWidth: 100,
        field: 'nationalCode',
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'person.nameAndFamily',
        headerGroupComponent: 'cellHeader',
        children: [
          {
            headerName: 'فارسی',
            valueGetter: (params: any) => params.data.name + ' ' + params.data.family,
          },
          {
            headerName: 'English',
            valueGetter: (params: any) => params.data.englishName + ' ' + params.data.englishFamily,
          },
        ]
      },
      {
        headerName: 'person.gender',
        minWidth: 50,
        maxWidth: 50,
        valueGetter: (params: any) => {
          return params.data.gender === true ? 'مرد' : 'زن';
        },
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'person.birthDate',
        minWidth: 100,
        maxWidth: 100,
        field: 'birthDate',
        cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
      }, {
        headerName: 'passport.*',
        headerGroupComponent: 'cellHeader',
        children: [//@TODO generate iterative
          {
            headerName: 'passport.expireDate',
            minWidth: 100,
            maxWidth: 100,
            field: 'passportExpireDate',
            cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
          },
          {
            headerName: 'passport.number',
            field: 'passportNo',
            minWidth: 100,
            maxWidth: 100,
          }
        ],
      },
      {
        minWidth: 90,
        maxWidth: 90,
        cellRenderer: 'cellToolbar',
        cellRendererParams: {
          items: this.toolbarItems,
        },
      },
    ];

    this.frameworkComponents = {
      cellToolbar: CellToolbarComponent,
      cellHeader: CellHeaderComponent,
    };
  }

  refresh() {
    this.gridApi.refreshView();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.setInitialLayout(this.gridApi);
    this.loadData();
  }

  setInitialLayout(api: any) {
    api.sizeColumnsToFit();
    setTimeout(function () {
      api.forEachNode(function (node: any) {
        node.setExpanded();
      });
    }, 100);
  }

  initToolbar(items: ToolbarItem[]) {
    this.toolbarItems.push(...items);
  }

  loadData() {
    this.personService.getLeaders().subscribe(x => {
        this.rows = x,
          this.gridApi.setRowData(this.rows);
      }
    );
  }

  remove(item: any) {
    let index = this.rows.indexOf(item);
    if (index <= -1)
      return;
    this.rows.splice(index, 1);
    this.gridApi.setRowData(this.rows);
  }
}

