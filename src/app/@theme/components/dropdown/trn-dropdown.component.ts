import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TrnEditControlBase } from "../trn-edit-control-base";

export class SelectItem {
  text: string;
  value: any;
}

export const customDropdownControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrnDropdownComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: "trn-dropdown",
  templateUrl: "trn-dropdown.component.html",
  styleUrls: ["trn-dropdown.component.scss"],
  providers: [customDropdownControlValueAccessor]
})
export class TrnDropdownComponent extends TrnEditControlBase{
  @Input() items = [];
  @Input() currentItem: any;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() className:string;
  selectedChange(event) {
    console.log(event);
  }
}
