import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { Tour } from "../../@core/data/models/client.model";
import { TourService } from "../../@core/data/tour.service";

@Component({
  selector: "tour-upsert",
  templateUrl: "tour-upsert.component.html",
  styleUrls: ["tour-upsert.component.scss"],
})
export class TourUpsertComponent implements ModalInterface {
  form: FormGroup;
  model: Tour;

  constructor(public formService: FormService, public modalInstance: NgbActiveModal,public service:TourService) {
  }

  show(model: Tour = new Tour()) {
    this.model = model;
    this.form = FormService.CreateTourForm(this.model);
    this.formService.init(this.form, model);
  }

  save(){
    //@TODO check validation
    this.service.addTour(this.model);
    this.modalInstance.close(this.model);
  }
}
