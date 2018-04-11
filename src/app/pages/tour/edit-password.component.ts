import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { EditPassword } from "../../@core/data/models/client.model";
import { FormService } from "../../@core/data/form.service";
import { ModalInterface } from "../../@theme/components/modal.interface";

@Component({
  moduleId: module.id,
  selector: "edit-password",
  templateUrl: "edit-password.component.html",
  styleUrls: ["edit-password.component.scss"]
})
export class EditPasswordComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormService<EditPassword>,
              public dialogInstance: MatDialogRef<ModalInterface>) {

  }

  save() {
  }
}
