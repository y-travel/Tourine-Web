import { Component } from "@angular/core";
import { GridOptions } from "ag-grid";

import { TourService } from "../../../@core/data/tour.service";
import { TourUpsertComponent } from "../tour-upsert/tour-upsert.component";
import { CouponUpsertComponent } from "../coupon-upsert.component";
import { ReagentUpsertComponent } from "../reagent-upsert.component";
import { EditPasswordComponent } from "../edit-password.component";
import { DialogService } from "../../../@core/utils/dialog.service";
import { FormFactory } from "../../../@core/data/models/form-factory";

@Component({
  selector: "tour-list",
  templateUrl: "./tour-list.component.html",
  styleUrls: ["./tour-list.component.scss"]
})
export class TourListComponent {
  gridOptions: GridOptions;
  rowData: any[];
  columnDefs: any[];
  source: any;

  constructor(private tourService: TourService,
              private formFactory: FormFactory,
              public dialogService: DialogService) {
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      }
    };
    this.columnDefs = [
      {headerName: "Make", field: "code"},
      {headerName: "Model", field: "tourDetail.startDate"},
      {headerName: "Price", field: "capacity"},
      {headerName: "Price", field: "basePrice"},
      {headerName: "Price", field: "tourDetail.placeId"},
    ];
    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
    ];
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  upsert() {
    const ref = this.dialogService.open(TourUpsertComponent, this.formFactory.createTourForm());
    ref.afterClosed().subscribe(data => this.source.push(data));
  }

  couponUpsert() {
    const ref = this.dialogService.open(CouponUpsertComponent, this.formFactory.createCouponForm());
  }

  reagentUpsert() {
    this.dialogService.open(ReagentUpsertComponent, this.formFactory.createReagentForm());
  }

  userUpsert() {
    this.dialogService.open(EditPasswordComponent, this.formFactory.createEditPasswordForm());
  }
}
