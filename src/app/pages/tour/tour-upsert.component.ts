import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { Tour } from "../../@core/data/models/client.model";
import { TourService } from "../../@core/data/tour.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "tour-upsert",
  templateUrl: "tour-upsert.component.html",
  styleUrls: ["tour-upsert.component.scss"],
})
export class TourUpsertComponent implements ModalInterface {
  form: FormGroup;
  model: Tour;
  destinations: any;
  hotels: any;

  constructor(public formService: FormService, public modalInstance: NgbActiveModal, public service: TourService, private translateService: TranslateService) {
    this.developerSeed();
  }

  developerSeed() {
    this.destinations = [
      {
        id: 1,
        name: "سوریه"
      },  {
        id: 2,
        name: "کربلا"
      },  {
        id: 3,
        name: "نجف"
      },  {
        id: 4,
        name: "مکه"
      },
    ];
    this.hotels = [
      {
        id: 1,
        name: "القدیر"
      },  {
        id: 2,
        name: "مشکوکات"
      },  {
        id: 3,
        name: "ساحره"
      },  {
        id: 4,
        name: "نریمان"
      },
    ];
  }

  show(model: Tour = new Tour()) {
    this.model = model;
    this.form = FormService.CreateTourForm(this.model);
    this.formService.init(this.form, model);
  }

  save() {
    //@TODO check validation
    this.service.addTour(this.model);
    this.modalInstance.close(this.model);
  }
}
