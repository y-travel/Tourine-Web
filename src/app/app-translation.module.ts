import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function TranslationHttpFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationHttpFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    TranslateService
  ]
})
export class AppTranslationModule {
  constructor(translateService: TranslateService) {
    translateService.setDefaultLang('fa');
    translateService.use('fa');

  }
}
