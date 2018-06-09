import { Component, Inject } from '@angular/core';
//
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Destination, Person, Place, Tour } from '../../../@core/data/models/client.model';
import { DialogMode, ENUMS, EnumsDefinition, OptionType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { TourUpsertViewModel } from './tour-upsert.view-model';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { DialogService } from '../../../@core/utils/dialog.service';

@Component({
  selector: 'trn-tour-upsert',
  templateUrl: './tour-upsert.component.gen.html',
  styleUrls: ['./tour-upsert.component.scss'],
  providers: [TourUpsertViewModel],
})
export class TourUpsertComponent implements ModalInterface {
  dialogMode: DialogMode;
  destinations: Observable<Destination[]>;
  places: Observable<Place[]>;
  leaders: Observable<Person[]>;
  optionType = OptionType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public service: TourService,
              public vModel: TourUpsertViewModel,
              public dialogService: DialogService,
              @Inject(UTILS) public utils: AppUtils,
              @Inject(ENUMS) public enums: EnumsDefinition) {
  }

  initDialog() {
    this.vModel.init(this.data);
    this.initData();
  }

  initData() {
    this.places = this.service.getPlaces();
    this.destinations = this.service.getDistinations();
    this.leaders = this.service.getLeaders();
    this.initOptions();
  }

  initOptions() {
    if (this.dialogMode === DialogMode.Edit) {
      this.service.getOptions(this.vModel.model.id).subscribe(options => this.vModel.form.updateForm(<Tour>{options: options}));
    }
  }

  save() {
    if (this.vModel.form.invalid) {
      this.vModel.form.markAllFieldAsTouch();
      return;
    }
    this.service.upsertTour(this.vModel.model).subscribe(tour => {
      this.dialogInstance.close(this.vModel.model);
    }, error => {
      console.log(error);
      this.dialogService.openDialog('ظرفیت کل نمی تواند از ظرفیت رزرو شده کمتر باشد');
    });
  }

}
