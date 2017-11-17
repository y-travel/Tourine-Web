import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FormFieldComponent,
  HeaderComponent,
  SearchInputComponent,
  ThemeSwitcherComponent,
  TrhButtonDirective,
  TrhDropdownComponent,
  TrhInputDirective,
  TrhSliderComponent,
} from './components';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import { TourineLayoutComponent } from './layouts';
import { AppTranslationModule } from "../app-translation.module";
import { TrhCardComponent } from './components/card/trh-card.component';
import { TrhLayoutComponent } from './components/layout/trh-layout.component';
import { TrhMenuComponent } from './components/menu/trh-menu.component';
import { TrhSidebarComponent } from './components/sidebar/trh-sidebar.component';
import { SidebarService } from "./components/sidebar/sidebar.service";
import { MenuService } from "./components/menu/menu.service";
import { TrhCheckboxComponent } from './components/checkbox/trh-checkbox.component';
import { MatFormFieldModule } from "@angular/material";

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  MatFormFieldModule,
  NgbModule,
];

const COMPONENTS = [
  ThemeSwitcherComponent,
  HeaderComponent,
  SearchInputComponent,
  TourineLayoutComponent,
  FormFieldComponent,
  TrhInputDirective,
  TrhButtonDirective,
  TrhDropdownComponent,
  TrhSliderComponent,
  TrhCardComponent,
  TrhLayoutComponent,
  TrhMenuComponent,
  TrhSidebarComponent,
  TrhCheckboxComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
];

const THEME_PROVIDERS = [
  MenuService,
  SidebarService,

];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, AppTranslationModule],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...THEME_PROVIDERS],
    };
  }
}
