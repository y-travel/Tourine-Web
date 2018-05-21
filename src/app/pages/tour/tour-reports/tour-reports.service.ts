import { Inject, Injectable } from '@angular/core';
import { TourService } from '../../../@core/data/tour.service';
import { GridOptions } from 'ag-grid';
import { PersonService } from '../../../@core/data/person.service';
import { TranslateService } from '@ngx-translate/core';
import { FormatterService } from '../../../@core/utils/formatter.service';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { CellHeaderComponent } from '../../../shared/trn-ag-grid/cell-header/cell-header.component';
import { Dictionary, TeamMember, Tour } from '../../../@core/data/models/client.model';
import { OptionType } from '../../../@core/data/models/enums';

@Injectable()
export class TourReportGridService {

  gridOptions: GridOptions;
  gridColumnApi: any;
  rows: TeamMember[];
  selectedTourId: string;
  ticketColumnDef: any[];
  visaColumnDef: any[];
  tourColumnDef: any[];
  buyerColumnDef: any[];
  frameworkComponents: any;
  gridApi: any;
  tourAgency: Dictionary<string> = {};

  constructor(public personService: PersonService,
              public tourservice: TourService,
              private translate: TranslateService,
              private formatter: FormatterService,
              @Inject(UTILS) private utils: AppUtils, ) {
    this.init();
  }

  init() {
    this.rows = [];
    this.gridOptions = {
      defaultColDef: {
        headerComponentFramework: <{ new(): CellHeaderComponent }>CellHeaderComponent,
      },
    };

    this.colDef();
    this.frameworkComponents = {
      cellHeader: CellHeaderComponent,
    };
  }

  colDef() {
    this.ticketColumnDef = [
      {
        headerName: 'row',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'person.nameAndFamily',
        maxWidth: 300,
        valueGetter: (params: any) => params.data.person ? ' ' + params.data.person.name + ' ' + params.data.person.family : '',
        valueFormatter: (params: any) => {
          return params.data.person.gender ?
            this.translate.instant('maleTitle') + params.value :
            this.translate.instant('femaleTitle') + params.value;
        }
      },
      {
        headerName: 'person.englishNameAndFamily',
        maxWidth: 300,
        valueGetter: (params: any) => ' ' + params.data.person.englishName + ' ' + params.data.person.englishFamily,
      },
      {
        headerName: 'passportNumber',
        field: 'person.passportNo',
        minWidth: 120,
        maxWidth: 120,
      },

      {
        headerName: '',
        field: 'person.isInfant',
        minWidth: 1,
        maxWidth: 1,
      },
      {
        headerName: '',
      },
    ];

    this.visaColumnDef = [
      {
        headerName: 'row',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'person.nameAndFamily',
        maxWidth: 300,
        valueGetter: (params: any) => ' ' + params.data.person.name + ' ' + params.data.person.family,
        valueFormatter: (params: any) => {
          return params.data.person.gender ?
            this.translate.instant('maleTitle') + params.value :
            this.translate.instant('femaleTitle') + params.value;
        }
      },
      {
        headerName: 'agency.*',
        valueGetter: (params: any) => this.tourAgency[params.data.tourId],
        minWidth: 120,
        maxWidth: 120,
      },
      {
        headerName: '',
      },
    ];

    this.tourColumnDef = [
      {
        headerName: 'row',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'person.nameAndFamily',
        maxWidth: 300,
        valueGetter: (params: any) => ' ' + params.data.person.name + ' ' + params.data.person.family,
        valueFormatter: (params: any) => {
          return params.data.person.gender ?
            this.translate.instant('maleTitle') + params.value :
            this.translate.instant('femaleTitle') + params.value;
        }
      },
      {
        headerName: 'options',
        valueGetter: (params: any) => {
          if (params.data.person.isInfant) {
            return this.translate.instant('infant');
          }
          if (params.data.person.isUnder5) {
            return this.getOptions(params.data);
          }
          return this.translate.instant('adult.*');
        },
        minWidth: 300,
        maxWidth: 300,
      },
      {
        headerName: '',
      },
    ];

    this.buyerColumnDef = [
      {
        headerName: 'row',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: (params: any) => (params.node.rowIndex + 1).toString(),
      },
      {
        headerName: 'buyer.*',
        maxWidth: 300,
        valueGetter: (params: any) => ' ' + params.data.title,
        valueFormatter: (params: any) => {
          if (params.data.isAgency) {
            return this.translate.instant('agency.*') + params.value;
          }
          return params.data.gender ?
            this.translate.instant('maleTitle') + params.value :
            this.translate.instant('femaleTitle') + params.value;
        }
      },
      {
        headerName: 'phone',
        field: 'phone',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'count',
        field: 'count',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: 'total',
        field: 'price',
        minWidth: 100,
        maxWidth: 100,
      },
      {
        headerName: '',
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

  loadTourAgency(tourId: string) {
    this.personService.getTourAgency(tourId).subscribe((tours: Tour[]) => {
      tours.forEach(t => this.tourAgency[t.id] = t.agency.name);
    });
  }

  getOptions(params: any) {
    if (params.personIncomes.length === 0) {
      return this.translate.instant('noneOptions');
    }
    let templateStr = '';
    let rev = Array(...this.utils.getEnumNames(OptionType)).filter(x => x !== OptionType[OptionType.Empty]);
    rev = rev.filter(x => !params.personIncomes.some(z => OptionType[z.optionType] === x));
    if (rev.length === 0) {
      return this.translate.instant('haveAllOptions');
    }
    rev = rev.map(x => 'optionType.' + x);
    rev.forEach(x => templateStr += this.translate.instant(x) + '،');
    return this.translate.instant('nonePrefix') + ' ' + templateStr.slice(0, templateStr.length - 1);
  }
}
