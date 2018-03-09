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

@Component({
  selector: 'app-block-upsert',
  templateUrl: './block-upsert.component.html',
  styleUrls: ['./block-upsert.component.scss']
})
export class BlockUpsertComponent implements OnInit, ModalInterface {

  person: FormService<Person>;
  agencyListForm: FormService<Agency>;
  agencies: Observable<Agency[]>;
  passengers: Array<FormService<Person>> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Coupon>,
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

  ngOnInit() {
  }
}
