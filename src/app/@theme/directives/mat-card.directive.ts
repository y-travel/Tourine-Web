import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'mat-card'
})
export class MatCardDirective {
  @HostBinding('class.card-stretch') @Input() stretch: boolean;
  @HostBinding('class.card-shadow-thick') @Input() thickShadow: boolean;
}
