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
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatStepperModule, MatToolbarModule
} from "@angular/material";

import { HeaderComponent, SearchInputComponent, ThemeSwitcherComponent, TrhDropdownComponent, TrhSliderComponent, } from './components';
import { TrhButtonDirective, TrhInputDirective, AutoTranslateDirective } from "./directives";
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
import { FlexLayoutModule } from "@angular/flex-layout";

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatCheckboxModule,
  FlexLayoutModule,
  MatStepperModule,
  MatIconModule,
  MatCommonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule, //@TODO Should be localize with moment.js
  MatToolbarModule,
];

const COMPONENTS = [
  ThemeSwitcherComponent,
  HeaderComponent,
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
