import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "../../@core/data/form.service";
import { FormFactory } from "../../@core/data/models/form-factory";
import { Coupon } from "../../@core/data/models/client.model";
import { LocalDataSource } from "ng2-smart-table";
import { ModalInterface } from "../../@theme/components/modal.interface";

@Component({
  moduleId: module.id,
  selector: "coppon-upsert",
  templateUrl: "coupon-upsert.component.html",
  styleUrls: ["coupon-upsert.component.scss"]
})
export class CouponUpsertComponent implements ModalInterface{
  form: FormService<Coupon>;
  reagents = [];
  passengers = [];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: "title",
        type: "string",
      },
      family: {
        title: "family",
        type: "string"
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();

  constructor(formFactory: FormFactory) {
    this.form = formFactory.createCouponForm();
  }

  save() {
  }

  show(){}
}
