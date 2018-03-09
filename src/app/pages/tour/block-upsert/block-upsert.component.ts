import { Component, OnInit, Inject } from '@angular/core';

import { FormService } from "../../../@core/data/form.service";
import { Coupon, Person, Agency } from "../../../@core/data/models/client.model";
import { ModalInterface } from "../../../@theme/components/modal.interface";
import { MAT_DIALOG_DATA, MatDialogRef, MatStepper } from "@angular/material";
import { DialogService } from "../../../@core/utils/dialog.service";
import { FormFactory } from "../../../@core/data/models/form-factory";
import { CouponService } from "../../../@core/data/coupon.service";
import { AgencyService } from "../../../@core/data/agency.service";
import { Observable } from "rxjs/Rx";
import { TourService } from "../../../@core/data/tour.service";
import { AgencyUpsertComponent } from '../agency-upsert/agency-upsert.component';
import { Block } from '../../../@core/data/models';

@Component({
  selector: 'app-block-upsert',
  templateUrl: './block-upsert.component.html',
  styleUrls: ['./block-upsert.component.scss']
})
export class BlockUpsertComponent implements OnInit, ModalInterface {

  freeSpace = "";
  block: FormService<Block>;
  person: FormService<Person>;
  agencyListForm: FormService<Agency>;
  agencies: Observable<Agency[]>;
  newBlock: Block = <Block>{ capacity: 0 };

  //passengers: Array<FormService<Person>> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Block>,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: AgencyService) {
    this.init();
  }

  init() {
    this.person = this.formFactory.createPersonForm();
    this.agencyListForm = this.formFactory.createAgenciesForm();
    this.agencies = this.service.getList();
    this.block = this.formFactory.createReserveBlockForm();
    //@TODO: get tourId from list
    this.service.getTourFreeSpace("c17496cf-7a71-451f-91da-1d10b165be13").subscribe(x => this.freeSpace = x);
    console.log(this.agencies);
  }

  save() {
    //@TODO Impl. validation
    const model = this.data.model;
    this.dialogInstance.close(model);
  }

  show() {
  }

  agencyUpsert() {
    const ref = this.dialogService.open(AgencyUpsertComponent, this.formFactory.createAddAgencyForm());
    ref.afterClosed().subscribe(data => this.agencies = this.service.getList());
  }

  next(stepper: MatStepper) {
    if (stepper.selectedIndex == 1) {
      if (this.block.form.valid) {
        this.service.reserveBlock(this.block.model).subscribe(x => {
          stepper.next();
          //@TODO : save returned dto to model to can update when back to step 2
          this.newBlock.capacity = x.capacity;
          this.newBlock.id = x.id;
          //-----
        });
      }
      else
        stepper.next();
    }
    else
      stepper.next();
  }

  previous(stepper: MatStepper) {
    stepper.previous();
  }

  ngOnInit() {
  }
}
