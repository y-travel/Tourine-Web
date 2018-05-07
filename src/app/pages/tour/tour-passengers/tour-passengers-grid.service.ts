import { Inject, Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TeamMember, Person, OptionType, Tour, Dictionary, Agency } from '../../../@core/data/models';
import { ToolbarItem, CellToolbarComponent } from '../../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';
import { PersonService } from '../../../@core/data/person.service';
import { TranslateService } from '@ngx-translate/core';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { AppUtils, UTILS } from '../../../@core/utils';
import { CellHeaderComponent } from '../../../shared/trn-ag-grid/cell-header/cell-header.component';
import { CellDetailComponent } from '../../../shared/trn-ag-grid/cell-detail/cell-detail.component';

@Injectable()
export class TourPassengersGridService {
  gridOptions: GridOptions;
  gridColumnApi: any;
  rows: TeamMember[];

  selectedTourId: string;
  tourAgency: Dictionary<Agency> = {};

  columnDefs: any[];
  toolbarTourItems: ToolbarItem[] = [];
  frameworkComponents: any;
  detailCellRenderer: any;
  detailCellRendererParams: any;
  gridApi: any;

  constructor(public personService: PersonService,
    private translate: TranslateService,
    private formatter: FormatterService,
    @Inject(UTILS) private utils: AppUtils, ) {
    this.init();
  }

  init() {
    this.loadTourAgency(this.selectedTourId);
    this.rows = [];
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };

    this.columnDefs = [
      {
        headerName: '',
        maxWidth: 50,
        minWidth: 50,
        checkboxSelection: true,

      },
      {
        headerName: 'row',
        field: 'personId',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'person.nameAndFamily',
        valueGetter: (params: any) => params.data.person.gender == true
          ? 'آقای ' + params.data.person.name + ' ' + params.data.person.family
          : 'خانم ' + params.data.person.name + ' ' + params.data.person.family,
      },
      {
        headerName: 'agency.*',
        field: 'tourId',
        cellRenderer: (params: any) => this.tourAgency[params.value].name,
      },
      {
        headerName: 'options',
        headerGroupComponent: 'cellHeader',
        children: [//@TODO generate iterative
          {
            headerName: '',
            minWidth: 30,
            maxWidth: 30,
            headerComponentParams: { matIcon: this.utils.mapOptionTypeToIcon(OptionType.Room) },
            cellRenderer: params => `<input type='checkbox' ${params.data.personIncomes.some(x => x.optionType === OptionType.Room) ? 'checked' : ''} disabled />`
          }, {
            headerName: '',
            minWidth: 30,
            maxWidth: 30,
            headerComponentParams: { matIcon: this.utils.mapOptionTypeToIcon(OptionType.Bus) },
            cellRenderer: params => `<input type='checkbox' ${params.data.personIncomes.some(x => x.optionType === OptionType.Bus) ? 'checked' : ''} disabled />`
          }, {
            headerName: '',
            minWidth: 30,
            maxWidth: 30,
            headerComponentParams: { matIcon: this.utils.mapOptionTypeToIcon(OptionType.Food) },
            cellRenderer: params => `<input type='checkbox' ${params.data.personIncomes.some(x => x.optionType === OptionType.Food) ? 'checked' : ''} disabled />`
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

  getPerson(model: Person) {
    this.personService.getPerson(model).subscribe((persons: Person[]) => {
      console.log(persons)
    });
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
    this.gridApi.redrawRows();
  }

  remove(item: any) {
    const index = this.rows.indexOf(item);
    if (index <= -1)
      return;
    this.rows.splice(index, 1);
    this.gridApi.setRowData(this.rows);
  }

  setRow(row: TeamMember[]) {
    this.rows = row;
  }

  loadTourAgency(tourId: string) {
    this.personService.getTourAgency(tourId).subscribe((tours: Tour[]) => {
      tours.forEach(t => this.tourAgency[t.id] = t.agency);
    });
  }
}
