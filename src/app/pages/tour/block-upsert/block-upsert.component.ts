import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Agency, Block, Tour } from '../../../@core/data/models/client.model';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { MAT_DIALOG_DATA, MatButton, MatDialogRef, MatSelect, MatStepper } from '@angular/material';
import { DialogService } from '../../../@core/utils/dialog.service';
import { FormFactory } from '../../../@core/data/models/form-factory';
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
export class BlockUpsertComponent implements OnInit, ModalInterface, ModalInterface {
  dialogMode: DialogMode;
  DialogMode = DialogMode;
  freeSpace: number;
  agencies: Observable<Agency[]>;
  isNewBlock = false;
  optionType = OptionType;
  @ViewChild('addPassengerBtn') addPassengerBtn: MatButton;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(UTILS) private utils: AppUtils,
              public vModel: BlockUpsertViewModel,
              public dialogInstance: MatDialogRef<ModalInterface>,
              private dialogService: DialogService,
              private tourService: TourService,
              public formFactory: FormFactory,
              public service: AgencyService) {
  }

  initDialog() {
    this.isNewBlock = this.dialogMode === DialogMode.Create;
    this.vModel.init(this.data.tourId, this.data.block, !this.isNewBlock);
    this.tourService
      .getOptions(this.isNewBlock ? this.vModel.tourId : this.vModel.model.id)
      .subscribe(x => this.vModel.form.updateForm(<Tour>{options: x}));
    this.agencies = this.service.getList();
    this.service.getTourFreeSpace(this.vModel.tourId).subscribe(x => {
      this.freeSpace = +x;
    });
  }

  agencyUpsert() {
    const ref = this.dialogService.openPopup(AgencyUpsertComponent, this.formFactory.createAddAgencyForm());
    ref.afterClosed().subscribe(data => this.agencies = this.service.getList());
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
    this.isNewBlock = this.utils.isNullOrUndefined(newBlock);
    stepper.next();
    this.vModel.updateForm(newBlock);
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
    //@TODO tmp
    const tmpBlock = Serializable.fromJSON(new Block(), this.vModel.model);
    const ref = this.dialogService.openPopup(PassengerUpsertComponent, this.formFactory.createAddPassengersForm(tmpBlock));
    ref.afterClosed().subscribe(x => {
      if (x > 0) {
        this.addPassengerBtn.disabled = true;
      } else {
        this.addPassengerBtn.disabled = false;
      }
    });
  }
}
