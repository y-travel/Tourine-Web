import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { User } from "../../@core/data/models/client.model";
import { FormService } from "../../@core/data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";

@Component({
  moduleId: module.id,
  selector: "user-upsert",
  templateUrl: "user-upsert.component.html",
  styleUrls: ["user-upsert.component.scss"]
})
export class UserUpsertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<User>,
              public dialogInstance: MatDialogRef<ModalInterface>) {

  }

  save() {
  }
}
