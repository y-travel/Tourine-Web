import { Component, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
//
import { FormService } from "../../@core/data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";
import { Tour } from "../../@core/data/models";
import { TourService } from "../../@core/data/tour.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Destination, Place } from "../../@core/data/models/client.model";

@Component({
  selector: "tour-upsert",
  templateUrl: "tour-upsert.component.html",
  styleUrls: ["tour-upsert.component.scss"],
})
export class TourUpsertComponent implements ModalInterface {
  form: FormService<Tour>;
  destinations: Observable<Destination[]>;
  places: Observable<Place[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Tour>,
              public dialogInstance: MatDialogRef<ModalInterface>,
              public service: TourService,
              private translateService: TranslateService) {
    this.initData();
  }

  initData() {
    this.places = this.service.getPlaces();
    this.destinations = this.service.getDistinations();
  }

  save() {
    //@TODO check validation
    this.service.addTour(this.data.model).subscribe(tour => {
      console.log(tour);
    });
    this.dialogInstance.close(this.data.model);
  }

  submit(event) {
    console.log(event);
  }

}
