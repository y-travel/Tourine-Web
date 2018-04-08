import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Agency } from '../../../@core/data/models/client.model';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect, MatStepper, MatButton } from '@angular/material';
import { Dialog, DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { AgencyService } from '../../../@core/data/agency.service';
import { Observable } from 'rxjs/Rx';
import { AgencyUpsertComponent } from '../agency-upsert/agency-upsert.component';
import { Block } from '../../../@core/data/models';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { BlockUpsertViewModel } from './block-upsert.view-model';
import { DialogMode } from '../../../@core/data/models/enums';

@Component({
  selector: 'app-block-upsert',
  templateUrl: './block-upsert.component.html',
  styleUrls: ['./block-upsert.component.scss'],
  providers: [BlockUpsertViewModel],
})
export class BlockUpsertComponent implements OnInit, ModalInterface, Dialog {
  dialogMode: DialogMode;
  freeSpace: number;
  agencies: Observable<Agency[]>;
  newBlock: Block = <Block>{ capacity: 0, id: null };
  @ViewChild('addPassengerBtn') addPassengerBtn: MatButton;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public vModel: BlockUpsertViewModel,
    public dialogInstance: MatDialogRef<ModalInterface>,
    private dialogService: DialogService,
    public formFactory: FormFactory,
    public service: AgencyService) {
  }

  initDialog() {
    this.vModel.init(this.data, this.dialogMode === DialogMode.Edit);
    this.agencies = this.service.getList();
    this.service.getTourFreeSpace(this.vModel.model.id).subscribe(x => {
      this.freeSpace = +x;
    });
  }

  save() {
    //@TODO Impl. validation
    const model = this.vModel.model;
    this.dialogInstance.close(model);
  }

  agencyUpsert() {
    const ref = this.dialogService.openPopup(AgencyUpsertComponent, this.formFactory.createAddAgencyForm());
    ref.afterClosed().subscribe(data => this.agencies = this.service.getList());
  }

  next(stepper: MatStepper) {
    if (stepper.selectedIndex === 1) {
      if (this.vModel.form.valid) {
        if (this.newBlock.id == null)
          this.service.reserveBlock(this.vModel.model).subscribe(x => {
            stepper.next();
            this.vModel.model.id = x.id;
            this.vModel.model.parentId = x.parentId;
            this.vModel.updateForm(this.vModel.model);
            //@TODO : save returned dto to model to can update when back to step 2
            this.newBlock.capacity = x.capacity;
            this.newBlock.id = x.id;
            this.newBlock.agencyId = x.agencyId;
            //-----
          });
        else {
          this.service.UpdateReservedBlock(this.vModel.model).subscribe(x => {
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
    stepper.next();
  }

  addPassengers() {
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(this.vModel.model));
    ref.afterClosed().subscribe(x => {
      if (x > 0) {
        this.addPassengerBtn.disabled = true;
      } else
        this.addPassengerBtn.disabled = false
    });
  }
}
