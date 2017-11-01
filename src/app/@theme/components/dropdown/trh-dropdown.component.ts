import { Component, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TrhEditControlBase } from "../trh-edit-control-base";

export class SelectItem {
  text: string;
  value: any;
}

export const customDropdownControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrhDropdownComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: "trh-dropdown",
  templateUrl: "trh-dropdown.component.html",
  styleUrls: ["trh-dropdown.component.scss"],
  providers: [customDropdownControlValueAccessor]
})
export class TrhDropdownComponent extends TrhEditControlBase{
  @Input() items = [];
  @Input() currentItem: any;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() className:string;
  selectedChange(event) {
    console.log(event);
  }
}
