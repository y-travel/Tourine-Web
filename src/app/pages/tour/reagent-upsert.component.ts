import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Reagent } from "../../@core/data/models/client.model";
import { FormService } from "../../@core/data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";

@Component({
  moduleId: module.id,
  selector: "reagent-upsert",
  templateUrl: "reagent-upsert.component.html",
  styleUrls: ["reagent-upsert.component.scss"]
})
export class ReagentUpsertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<Reagent>,
              public dialogRef: MatDialogRef<ModalInterface>) {
  }

  save() {
  }
}
