import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatCommonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatToolbarModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { SearchInputComponent, ThemeSwitcherComponent, TrhDropdownComponent, TrhHeaderComponent, TrhSliderComponent, } from './components';
import { AutoTranslateDirective, TrhButtonDirective, TrhInputDirective } from "./directives";
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
import { DialogService } from "../@core/utils/dialog.service";

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatCheckboxModule,
  MatStepperModule,
  MatIconModule,
  MatCommonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule, //@TODO Should be localize with moment.js
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
];

const OTHER_MODULES = [
  FlexLayoutModule,
];
const COMPONENTS = [
  ThemeSwitcherComponent,
  TrhHeaderComponent,
  SearchInputComponent,
  TourineLayoutComponent,
  TrhInputDirective,
  TrhButtonDirective,
  TrhDropdownComponent,
  TrhSliderComponent,
  TrhCardComponent,
  TrhLayoutComponent,
  TrhMenuComponent,
  TrhSidebarComponent,
  TrhCheckboxComponent,
  AutoTranslateDirective,
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
  DialogService,
];

@NgModule({
  imports: [...BASE_MODULES, ...MAT_MODULES, ...OTHER_MODULES, AppTranslationModule],
  exports: [...BASE_MODULES, ...MAT_MODULES, ...OTHER_MODULES, ...COMPONENTS, ...PIPES],
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
