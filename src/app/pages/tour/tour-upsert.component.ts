import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
//
import { FormService } from "../../@core/data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { Tour, FormFactory } from "../../@core/data/models";
import { TourService } from "../../@core/data/tour.service";

@Component({
  selector: "tour-upsert",
  templateUrl: "tour-upsert.component.html",
  styleUrls: ["tour-upsert.component.scss"],
})
export class TourUpsertComponent implements ModalInterface {
  form: FormService<Tour>;
  destinations: any;
  hotels: any;

  constructor(public formFactory: FormFactory, public modalInstance: NgbActiveModal, public service: TourService, private translateService: TranslateService) {
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

  show(model: Tour = new Tour()) {
    this.form = this.formFactory.createTourForm(model);
  }

  save() {
    //@TODO check validation
    this.service.addTour(this.form.model);
    this.modalInstance.close(this.form.model);
  }

  submit(event) {
    console.log(event);
  }
}
