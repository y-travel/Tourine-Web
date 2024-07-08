import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
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
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
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
import { AutoTranslateDirective, DialogDirective, MatCardDirective, TrnButtonDirective } from './directives';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import { TourineLayoutComponent } from './layouts';
import { AppTranslationModule } from '../app-translation.module';
import { DialogService } from '../@core/utils/dialog.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { JalaliMomentDateAdapter } from '../@core/utils/date/jalali-moment-date-adapter';
import { JALALI_MOMENT_FORMATS } from '../@core/utils/date/jalali-moment-format';
import { TextMaskModule } from 'angular2-text-mask';
import { MatFormFieldDirective } from './directives/mat-form-field.directive';

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
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatChipsModule,
  MatTabsModule,
  MatSnackBarModule,
];

const OTHER_MODULES = [
  FlexLayoutModule,
  TextMaskModule,
];

const COMPONENTS = [
  ThemeSwitcherComponent,
  TrnHeaderComponent,
  TourineLayoutComponent,
  TrnButtonDirective,
  TrnSliderComponent,
  TrnLayoutComponent,
  TrnMenuComponent,
  TrnSidebarComponent,
  AutoTranslateDirective,
  MatCardDirective,
  MatFormFieldDirective,
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
  {provide: MAT_DATE_LOCALE, useValue: 'fa'},
  {provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS},
];

@NgModule({
  imports: [...BASE_MODULES, ...MAT_MODULES, ...OTHER_MODULES, AppTranslationModule],
  exports: [...BASE_MODULES, ...MAT_MODULES, ...OTHER_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
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
