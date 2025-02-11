import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { AgGridNg2 } from 'ag-grid-angular';
import { TranslateService } from '@ngx-translate/core';
import { CellToolbarComponent, ToolbarItem } from '../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { CellDetailComponent } from '../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Block } from '../../@core/data/models';
import { FormatterService } from '../../@core/utils/formatter.service';
import { PersonService } from '../../@core/data/person.service';

@Injectable()
export class TeamGridService {
  gridOptions: GridOptions;
  columnDefs: any[];
  frameworkComponents: any;
  gridApi: any;
  grid: AgGridNg2;
  rows: Block[];
  icons: any;
  model: Block;
  toolbarBlockItems: ToolbarItem[] = [];

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
      },
      {
        headerName: 'person.nameAndFamily',
        minWidth: 150,
        maxWidth: 150,
        valueGetter: (params: any) => {
          return params.data.buyer.name + ' ' + params.data.buyer.family;
        }
      },
      {
        headerName: 'count',
        minWidth: 80,
        maxWidth: 80,
        field: 'count',
      },
      {
        headerName: 'submitDate',
        minWidth: 150,
        maxWidth: 150,
        field: 'submitDate',
        cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
      },
      {
        minWidth: 100,
        maxWidth: 100,
        cellRenderer: 'cellToolbar',
        cellRendererParams: {
          items: this.toolbarBlockItems,
        },
      },
    ];
    this.frameworkComponents = { cellDetail: CellDetailComponent, cellToolbar: CellToolbarComponent };
  }

  refresh() {
    this.gridApi.refreshView();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.setInitialLayout(this.gridApi);
    this.loadData(this.model.id);
  }

  setInitialLayout(api: any) {
    api.sizeColumnsToFit();
    setTimeout(function () {
      api.forEachNode(function (node: any) {
        node.setExpanded();
      });
    }, 100);
  }

  initToolbar(teamItems: ToolbarItem[]) {
    this.toolbarBlockItems.push(...teamItems);
  }

  loadData(id: string) {
    this.personService.getTourTeams(id).subscribe(x => this.setRows(x));
  }

  setRows(items: any[]) {
    this.rows = items;
    this.gridApi.setRowData(items);
  }

  remove(item: any) {
    const index = this.rows.indexOf(item);
    if (index <= -1) {
      return;
    }
    this.rows.splice(index, 1);
    this.gridApi.setRowData(this.rows);
  }
}
