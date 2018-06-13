import { Component, Inject, ViewChild } from '@angular/core';
import { Agency, Block, Tour } from '../../../@core/data/models/client.model';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef, MatStepper } from '@angular/material';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
import { FormService } from '../../../@core/data/form.service';
import { AgencyService } from '../../../@core/data/agency.service';
import { Observable } from 'rxjs';
import { AgencyUpsertComponent } from '../agency-upsert/agency-upsert.component';
import { PassengerUpsertComponent } from '../passenger-upsert/passenger-upsert.component';
import { BlockUpsertViewModel } from './block-upsert.view-model';
import { DialogMode, OptionType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { TourService } from '../../../@core/data/tour.service';
import { Serializable } from '../../../@core/utils/serializable';
import { first } from 'rxjs/operators';

@Component({
  selector: 'trn-block-upsert',
  templateUrl: './block-upsert.component.gen.html',
  styleUrls: ['./block-upsert.component.scss'],
  providers: [BlockUpsertViewModel],
})
export class BlockUpsertComponent implements ModalInterface, ModalInterface {
  dialogMode: DialogMode;
  DialogMode = DialogMode;
  agencies: Observable<Agency[]>;
  optionType = OptionType;
  @ViewChild('addPassengerBtn') addPassengerBtn: MatButton;
  formGroup: any;
  tourFreeSpace = 0;
  blockForm: FormService<Block>;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(UTILS) private utils: AppUtils,
              public vModel: BlockUpsertViewModel,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              private tourService: TourService,
              public formFactory: FormFactory,
              public agencyService: AgencyService) {
  }

  initDialog() {
    this.blockForm = this.formFactory.createAddPassengersForm(this.data.block);
    this.vModel.init(this.data.tour, this.data.block);
    this.tourService
      .getOptions(this.vModel.isEdit ? this.vModel.model.id : this.vModel.parentBlock.id)
      .subscribe(x => this.vModel.form.updateForm(<Tour>{options: x}));
    this.agencies = this.agencyService.getList();
    this.tourService.getTourFreeSpace(this.blockForm.model.id).subscribe(x => this.tourFreeSpace = +x);

  }

  agencyUpsert() {
    const ref = this.dialogService.openPopup(AgencyUpsertComponent, this.formFactory.createAddAgencyForm());
    ref.afterClosed().subscribe(data => this.agencies = this.agencyService.getList());
  }

  async next(stepper: MatStepper) {
    if (!this.vModel.isValid(stepper.selectedIndex)) {
      return;
    }
    if (stepper.selectedIndex !== 1) {
      stepper.next();
      return;
    }
    const newBlock = await this.tourService.upsertTour(this.vModel.model).pipe(first()).toPromise().catch(x => undefined);
    if (this.utils.isNullOrUndefined(newBlock)) {
      this.dialogService.openDialog('error');
      return;
    }
    stepper.next();
    this.vModel.updateForm(newBlock);
  }

  addPassengers() {
    //@TODO tmp
    console.log('hi');
    if (this.tourFreeSpace <= 0) {
      this.dialogService.openDialog('msg.thereIsNoFreeSpace');
      return;
    }
    const tmpBlock = Serializable.fromJSON(new Block(), this.vModel.model);
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(this.data.block));
    ref.afterClosed().subscribe(x => {
      console.log(x);
      if (x > 0) {
        this.addPassengerBtn.disabled = true;
      } else {
        this.addPassengerBtn.disabled = false;
      }
    });
  }
}
