import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector:"tour-upsert",
  templateUrl:"tour-upsert.component.html",
  styleUrls:["tour-upsert.component.scss"],
})
export class TourUpsertComponent{
  form:FormGroup;

}
