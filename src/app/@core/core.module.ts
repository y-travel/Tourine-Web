import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { ThemeService } from './utils/theme.service';
import { SpinnerService } from './utils/spinner.service';
import { DialogService } from './utils/dialog.service';
import { MatDialogModule } from '@angular/material';
import { AuthService } from './utils/auth.service';
import { APP_CONFIG, APP_CONFIG_INSTANCE } from './utils/app.config';
import { AppUtils, UTILS, UTILS_INSTANCE } from './utils/app-utils';
import { FormatterService } from './utils/formatter.service';

const CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  AnalyticsService,
  ThemeService,
  SpinnerService,
  DialogService,
  AuthService,
  FormatterService,
  { provide: UTILS, useValue: UTILS_INSTANCE },
  { provide: APP_CONFIG, useValue: APP_CONFIG_INSTANCE },
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
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
