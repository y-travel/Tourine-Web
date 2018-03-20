import { Component, Inject, OnInit } from '@angular/core';

import { FormService } from '../../../@core/data/form.service';
import { Agency, Person } from '../../../@core/data/models/client.model';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatStepper } from '@angular/material';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { AgencyService } from '../../../@core/data/agency.service';
import { Observable } from 'rxjs/Rx';
import { AgencyUpsertComponent } from '../agency-upsert/agency-upsert.component';
import { Block } from '../../../@core/data/models';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';

@Component({
  selector: 'app-block-upsert',
  templateUrl: './block-upsert.component.html',
  styleUrls: ['./block-upsert.component.scss']
})
export class BlockUpsertComponent implements OnInit, ModalInterface {

  freeSpace: number;
  person: FormService<Person>;
  agencyListForm: FormService<Agency>;
  agencies: Observable<Agency[]>;
  newBlock: Block = <Block>{ capacity: 0, id: null };

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
    this.service.getTourFreeSpace(this.data.model.id).subscribe(x => {
      this.freeSpace = +x
    });

  }

  save() {
    //@TODO Impl. validation
    const model = this.data.model;
    this.dialogInstance.close(model);
  }

  agencyUpsert() {
    const ref = this.dialogService.openPopup(AgencyUpsertComponent, this.formFactory.createAddAgencyForm());
    ref.afterClosed().subscribe(data => this.agencies = this.service.getList());
  }

  next(stepper: MatStepper) {
    if (stepper.selectedIndex == 1) {
      if (this.data.form.valid) {
        if (this.newBlock.id == null)
          this.service.reserveBlock(this.data.model).subscribe(x => {
            stepper.next();
            this.data.model.id = x.id;
            this.data.model.parentId = x.parentId;
            this.data.updateForm(this.data.model);
            //@TODO : save returned dto to model to can update when back to step 2
            this.newBlock.capacity = x.capacity;
            this.newBlock.id = x.id;
            this.newBlock.agencyId = x.agencyId;
            //-----
          });
        else {
          this.service.UpdateReservedBlock(this.data.model).subscribe(x => {
            stepper.next();
            this.newBlock.capacity = x.capacity;
            this.newBlock.id = x.id;
            this.newBlock.agencyId = x.agencyId;
          });
        }
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

  selectedItem(agencyId: MatSelect, stepper: MatStepper) {
    this.data.model.agencyId = agencyId.value;
    stepper.next();
  }

  addPassengers() {
    this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(this.data.model));
  }
}
