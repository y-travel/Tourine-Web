import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader ,TranslateService} from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";

export function TranslationHttpFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/i18n/",".json");
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide:TranslateLoader,
        useFactory:TranslationHttpFactory,
        deps:[HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers:[
    TranslateService
  ]
})
export class AppTranslationModule {
  constructor(translateService:TranslateService){
    translateService.setDefaultLang("fa");
    translateService.use("fa");

  }
}
