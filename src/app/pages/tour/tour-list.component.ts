import { Component } from "@angular/core";

import { TourService } from "../../@core/data/tour.service";
import { TourUpsertComponent } from "./tour-upsert.component";
import { CouponUpsertComponent } from "./coupon-upsert.component";
import { ReagentUpsertComponent } from "./reagent-upsert.component";
import { EditPasswordComponent } from "./edit-password.component";
import { DialogService } from "../../@core/utils/dialog.service";
import { FormFactory } from "../../@core/data/models/form-factory";

@Component({
  selector: "tour-list",
  templateUrl: "./tour-list.component.html",
  styleUrls: ["./tour-list.component.scss"]
})
export class TourListComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      destination: {
        title: 'مقصد',
        type: 'string',
      },
      date: {
        title: 'تاریخ',
        type: 'string',
      },
      hotel: {
        title: 'هتل',
        type: 'string',
      },
      capacity: {
        title: 'ظرفیت',
        type: 'number',
      },
      status: {
        title: 'وضعیت',
        type: 'string',
      },
    },
  };

  source: any;

  constructor(private tourService: TourService,
              private formFactory: FormFactory,
              public dialogService: DialogService) {
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
