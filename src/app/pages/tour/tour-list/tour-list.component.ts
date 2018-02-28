import { Component } from "@angular/core";
import { GridOptions } from "ag-grid";
import "ag-grid-enterprise";

import { TourService } from "../../../@core/data/tour.service";
import { TourUpsertComponent } from "../tour-upsert/tour-upsert.component";
import { CouponUpsertComponent } from "../coupon-upsert.component";
import { ReagentUpsertComponent } from "../reagent-upsert.component";
import { EditPasswordComponent } from "../edit-password.component";
import { DialogService } from "../../../@core/utils/dialog.service";
import { FormFactory } from "../../../@core/data/models/form-factory";
import { TourGridService } from "../tour-grid.service";

@Component({
  selector: "tour-list",
  templateUrl: "./tour-list.component.html",
  styleUrls: ["./tour-list.component.scss"]
})
export class TourListComponent {

  source: any;

  constructor(private tourService: TourService,
              private formFactory: FormFactory,
              public dialogService: DialogService,
              public tourGridService: TourGridService) {

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
