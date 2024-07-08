import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { ThemeService } from './utils/theme.service';
import { SpinnerService } from './utils/spinner.service';
import { DialogService } from './utils/dialog.service';
import { AuthService } from './utils/auth.service';
import { APP_CONFIG, APP_CONFIG_INSTANCE } from './utils/app.config';
import { UTILS, UTILS_INSTANCE } from './utils/app-utils';
import { FormatterService } from './utils/formatter.service';
import { ValidationService } from './utils/validation.service';
import { ENUMS, ENUMS_INSTANCE } from './data/models/enums';
import { ExceptionModule } from './exception.module';
import { LOGGER, LOGGER_INSTANCE } from './utils/logger.service';

const CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  AnalyticsService,
  ThemeService,
  SpinnerService,
  DialogService,
  AuthService,
  FormatterService,
  ValidationService,
  {provide: UTILS, useValue: UTILS_INSTANCE},
  {provide: APP_CONFIG, useValue: APP_CONFIG_INSTANCE},
  {provide: ENUMS, useValue: ENUMS_INSTANCE},
  {provide: LOGGER, useValue: LOGGER_INSTANCE},
];

@NgModule({
  imports: [
    CommonModule,
    ExceptionModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    };
  }
}
