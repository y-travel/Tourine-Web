import { Component, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
//
import { FormService } from "../../@core/data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { Tour } from "../../@core/data/models";
import { TourService } from "../../@core/data/tour.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "tour-upsert",
  templateUrl: "tour-upsert.component.html",
  styleUrls: ["tour-upsert.component.scss"],
})
export class TourUpsertComponent implements ModalInterface {
  form: FormService<Tour>;
  destinations: any;
  hotels: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public service: TourService,
              private translateService: TranslateService) {
    this.developerSeed();
  }

  developerSeed() {
    this.destinations = [
      {
        id: 1,
        name: "سوریه"
      }, {
        id: 2,
        name: "کربلا"
      }, {
        id: 3,
        name: "نجف"
      }, {
        id: 4,
        name: "مکه"
      },
    ];
    this.hotels = [
      {
        id: 1,
        name: "القدیر"
      }, {
        id: 2,
        name: "مشکوکات"
      }, {
        id: 3,
        name: "ساحره"
      }, {
        id: 4,
        name: "نریمان"
      },
    ];
  }

  save() {
    //@TODO check validation
    this.service.addTour(this.data.model);
    this.dialogInstance.close(this.data.model);
  }

  submit(event) {
    console.log(event);
  }
}
