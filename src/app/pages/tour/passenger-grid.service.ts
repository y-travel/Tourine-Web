import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { AgGridColumn } from 'ag-grid-angular';
import { TourService } from '../../@core/data/tour.service';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { FormatterService } from '../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Person, Agency,OptionType,TeamMember } from '../../@core/data/models';
import { PersonService } from './person.service';
import { ToolbarItem, CellToolbarComponent } from '../../shared/trn-ag-grid/cell-toolbar/cell-toolbar.component';

@Injectable()
export class PassengerGridService {
    gridOptions: GridOptions;
    gridColumnApi: any;
    rows: any[];

    columnDefs: any[];
    toolbarTourItems: ToolbarItem[] = [];
    frameworkComponents: any;
    detailCellRenderer: any;
    detailCellRendererParams: any;
    gridApi: any;

    constructor(public personService: PersonService,
        private translate: TranslateService,
        private formatter: FormatterService) {
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
                field: 'id',
                minWidth: 30,
                maxWidth: 30,
                cellRenderer: (params: any) => {
                    return `${this.rows.findIndex(person => person.id === params.value) + 1}`;
                },
            },
            {
                headerName: 'person.nc',
                minWidth: 100,
                maxWidth: 100,
                field: 'person.nationalCode',
                cellRenderer: 'agGroupCellRenderer',
            },
            {
                headerName: "نام و نام خانوادگی",
                children: [
                    {
                        headerName: "فارسی",
                        valueGetter: (params: any) => {
                            return params.data.person.name + ' ' + params.data.person.family
                        },
                    },
                    {
                        headerName: "English",
                        valueGetter: (params: any) => {
                            return params.data.person.englishName + ' ' + params.data.person.englishFamily
                        },
                    },
                ]
            },
            {
                headerName: 'person.gender',
                minWidth: 50,
                maxWidth: 50,
                valueGetter: (params: any) => {
                    return params.data.person.gender == 1 ? 'مرد' : 'زن';
                },
                cellRenderer: 'agGroupCellRenderer',
            },
            {
                headerName: 'person.birthDate',
                minWidth: 80,
                maxWidth: 80,
                field: 'person.birthDate',
                cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
            }, {
                headerName: 'person.passport',
                minWidth: 60,
                maxWidth: 60,
                valueGetter: (params: any) => {
                    return params.data.person.passportDelivered == true ? 'دارد' : 'ندارد';
                }
            },
            {
                headerName: 'passport.expireDate',
                minWidth: 80,
                maxWidth: 80,
                field: 'person.passportExpireDate',
                cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
            },
            {
                headerName: 'passport.number',
                field: 'person.passportNo',
                minWidth: 90,
                maxWidth: 90,
            }, {
                headerName: 'person.visaExpireDate',
                minWidth: 80,
                maxWidth: 80,
                field: 'person.visaExpireDate',
                cellRenderer: (params: any) => this.formatter.getDateFormat(params.value),
            },
            {
                headerName: "خدمات",
                children: [//@TODO generate iterative
                    {
                        headerName: '',
                        minWidth: 30,
                        maxWidth: 30,
                        field: '',
                        headerComponentParams: { matIcon: "restaurant" },
                        editable: true,
                        cellRenderer: params => {
                            return `<input type='checkbox' ${params.data.personIncomes.some(x => x.optionType === OptionType.Food)? 'checked' : ''} />`;
                        }
                    }, {
                        headerName: '',
                        minWidth: 30,
                        maxWidth: 30,
                        field: 'optionInfo.',
                        headerComponentParams: { matIcon: "hotel" },
                        cellEditor: 'popupSelect',
                        editable: true,
                        cellRenderer: params => {
                            return `<input type='checkbox' ${params.data.personIncomes.some(x => x.optionType === OptionType.Room)? 'checked' : ''} />`;
                        }
                    }, {
                        headerName: '',
                        minWidth: 30,
                        maxWidth: 30,
                        field: 'optionInfo.',
                        headerComponentParams: { matIcon: "directions_bus" },
                        editable: true,
                        cellRenderer: params => {
                            return `<input type='checkbox' ${params.data.personIncomes.some(x => x.optionType === OptionType.Bus)? 'checked' : ''} />`;
                        }
                    },
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
            cellDetail: CellDetailComponent, cellToolbar: CellToolbarComponent
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
        //this.fill();
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

    onAddRow() {
        var newItem: any;
        var res = this.gridApi.updateRowData({ add: [newItem] });
    }

    refresh() {
        this.gridApi.refreshView();
    }

    reloadData(model: any) {
        if (this.rows.findIndex(p => p.id === model.person.id) == -1) {
            this.rows.push({ person: model.person, optionInfo: model.teamMember });
            this.gridApi.setRowData(this.rows);
        }
    }

    fill() {
        this.personService.getPersons().subscribe(tours => {
            this.rows = tours;
            this.gridApi.setRowData(this.rows);
        });

    }

    remove(item: any) {
        var index = this.rows.indexOf(item);
        if (index <= -1)
            return;
        this.rows.splice(index, 1);
        this.gridApi.setRowData(this.rows);
    }
}
