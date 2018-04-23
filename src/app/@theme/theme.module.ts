import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTabsModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MenuService,
  SidebarService,
  ThemeSwitcherComponent,
  TrnHeaderComponent,
  TrnLayoutComponent,
  TrnMenuComponent,
  TrnSidebarComponent,
  TrnSliderComponent,
} from './components';
import { AutoTranslateDirective, DialogDirective, MatCardDirective, TrnButtonDirective, TrnInputDirective } from './directives';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import { TourineLayoutComponent } from './layouts';
import { AppTranslationModule } from '../app-translation.module';
import { DialogService } from '../@core/utils/dialog.service';
import { DialogComponent } from './components/dialog/dialog.component';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const MAT_MODULES = [
  MatFormFieldModule,
  MatDialogModule,
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
  MatTooltipModule,
  MatChipsModule,
  MatTabsModule,
];

const OTHER_MODULES = [
  FlexLayoutModule,
];

const COMPONENTS = [
  ThemeSwitcherComponent,
  TrnHeaderComponent,
  TourineLayoutComponent,
  TrnInputDirective,
  TrnButtonDirective,
  TrnSliderComponent,
  TrnLayoutComponent,
  TrnMenuComponent,
  TrnSidebarComponent,
  AutoTranslateDirective,
  MatCardDirective,
  DialogComponent,
  DialogDirective,
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
  declarations: [...COMPONENTS, ...PIPES,],
  entryComponents: [DialogComponent],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...THEME_PROVIDERS],
    };
  }
}
