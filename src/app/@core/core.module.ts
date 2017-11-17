import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { ThemeService } from "./utils/theme.service";
import { SpinnerService } from "./utils/spinner.service";

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  AnalyticsService,
  ThemeService,
  SpinnerService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
