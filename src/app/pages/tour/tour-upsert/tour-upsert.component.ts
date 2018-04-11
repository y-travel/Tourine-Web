import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//
import { FormService } from '../../../@core/data/form.service';
import { ModalInterface } from '../../../@theme/components/modal.interface';
import { Tour } from '../../../@core/data/models';
import { TourService } from '../../../@core/data/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Destination, Person, Place } from '../../../@core/data/models/client.model';
import { DialogMode, OptionType } from '../../../@core/data/models/enums';
import { AppUtils, UTILS } from '../../../@core/utils/app-utils';
import { Dialog } from '../../../@core/utils/dialog.service';

@Component({
  selector: 'tour-upsert',
  templateUrl: './tour-upsert.component.html',
  styleUrls: ['./tour-upsert.component.scss'],
})
export class TourUpsertComponent implements ModalInterface, Dialog {
  dialogMode: DialogMode;
  form: FormService<Tour>;
  destinations: Observable<Destination[]>;
  places: Observable<Place[]>;
  leaders: Observable<Person[]>;
  optionType = OptionType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public service: TourService,
              private translateService: TranslateService,
              @Inject(UTILS) public utils: AppUtils,) {
    this.initData();
  }

  initDialog() {
  }

  initData() {
    this.places = this.service.getPlaces();
    this.destinations = this.service.getDistinations();
    this.leaders = this.service.getLeaders();
    this.initOptions();
  }

  initOptions() {
    this.service.getOptions(this.data.model.id).subscribe(options => this.data.updateForm({options: options}));
  }

  save() {
    if (this.data.form.invalid) {
      this.data.markAllFieldAsTouch();
      return;
    }
    this.service.upsertTour(this.data.model).subscribe(tour => {
      this.dialogInstance.close(this.data.model);
    });
  }

}
