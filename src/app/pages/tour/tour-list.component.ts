import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocalDataSource } from "ng2-smart-table";

import { TourService } from "../../@core/data/tour.service";
import { TourUpsertComponent } from "./tour-upsert.component";
import { CouponUpsertComponent } from "./coupon-upsert.component";
import { ReagentUpsertComponent } from "./reagent-upsert.component";

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

  source: LocalDataSource = new LocalDataSource();

  constructor(private tourService: TourService, public modalService: NgbModal) {
    this.source.load(tourService.getList());
  }

  upsert() {
    const ref = this.modalService.open(TourUpsertComponent, {size: "sm", backdrop: "static", container: "nb-layout"});
    ref.componentInstance.show();
    ref.result.then(data =>{console.log(data);} );
  }

  copponUpsert() {
    const ref = this.modalService.open(CouponUpsertComponent, {size: "sm", backdrop: "static", container: "nb-layout"});
    ref.componentInstance.show();
    ref.result.then(data =>{console.log(data);} );
  }

  reagentUpsert(){
    this.modalService.open(ReagentUpsertComponent,{size:"lg",backdrop:"static",container:"nb-layout"});
  }
}
