import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '@ngx-translate/core';

import { TourService } from '../../@core/data/tour.service';
import { CellHeaderComponent } from '../../shared/trn-ag-grid/cell-header/cell-header.component';
import { FormatterService } from '../../@core/utils/formatter.service';
import { CellDetailComponent } from '../../shared/trn-ag-grid/cell-detail/cell-detail.component';
import { Person } from '../../@core/data/models/client.model';

@Injectable()
export class PassengerGridService {
    gridOptions: GridOptions;
    rowData: any[];
    columnDefs: any[];
    frameworkComponents: any;
    detailCellRenderer: any;
    detailCellRendererParams: any;
    gridApi: any;

    constructor(private tourService: TourService,
        private translate: TranslateService,
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
                headerName: 'person.nc',
                field: 'nationalCode',
                cellRenderer: 'agGroupCellRenderer',
                editable:true,
            },
            {
                headerName: 'person.name',
                field: 'name',
                cellRenderer: 'agGroupCellRenderer',
                editable:true,
            },
            {
                headerName: 'person.family',
                field: 'family',
                editable:true,
                
                cellEditor: "agRichSelect",
                cellEditorParams: {
                  values: ["English", "Spanish", "French", "Portuguese", "(other)"]
                }
            },
            {
                headerName: 'person.birthDate',
                field: 'birthdate',
                editable:true,
            },
            {
                headerName: 'passport.expireDate',
                field: 'passportExpireDate',
                editable:true,
            },
            {
                headerName: 'passport.number',
                field: 'passportNo',
                editable:true,
                singleClickEdit : true
            },
            {
                headerName: 'person.visa',
                field: 'visa',
                editable:true,
                checkboxSelection: function(params:any) {
                    console.log(params.nc);
                    return params.columnApi.getRowGroupColumns().length === 0;
                  },


            },
        ];

        this.detailCellRenderer = 'cellDetail';
        this.frameworkComponents = { 
            cellDetail: CellDetailComponent };

    }

    getPerson(model: Person) {
        this.tourService.getPersons(model).subscribe((persons: Person[]) => {
            console.log(persons)
        });
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.setInitialLayout(this.gridApi);
        this.onAddRow();
        
    params.api.sizeColumnsToFit();
    params.api.startEditingCell(params);
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

}
