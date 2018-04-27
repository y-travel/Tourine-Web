import { ErrorHandler, Inject, Injectable, Injector, NgModule } from '@angular/core';
import { LOGGER, LoggerService } from './utils/logger.service';
import { DialogService } from './utils/dialog.service';
import { APP_CONFIG, AppConfig } from './utils/app.config';
import { ResponseStatus } from './data/models/server.dtos';
import { HttpErrorResponse } from '@angular/common/http';

//

@Injectable()
export class ExceptionHandler implements ErrorHandler {
  private dialogService: DialogService

  constructor(@Inject(LOGGER) private loggerService: LoggerService,
              @Inject(APP_CONFIG) private config: AppConfig,
              injector: Injector) {
    //inject dialog service from this manner cos compiler throw error "Provider parse errors:..."
    setTimeout(() => this.dialogService = injector.get(DialogService));
  }

  handleError(error: any) {
    this.interceptError(error);
    this.loggerService.logError(this.findOriginalError(error));
  }

  interceptError(error: any) {
    if (error.rejection)//check async await exception
      error = error.rejection;

    if (error instanceof HttpErrorResponse) {
      const exception = new TrnHttpException(error.error, error.status);
      if (this.config.isDev() || exception.userVisible)
        this.dialogService.showSnack(exception.message);
    } else if (this.config.isDev())
      this.dialogService.showSnack(error.toString());
  }

  private findOriginalError(error: any): any {

    while (error && error.originalError) {

      error = error.originalError;

    }
    return error;
  }
}

@NgModule({
  providers: [{provide: ErrorHandler, useClass: ExceptionHandler}],
})
export class ExceptionModule {

}

export class TrnHttpException {
  errorCode: string;
  message: string;
  responseStatus: ResponseStatus;
  userVisible = false;

  constructor(error: any, public statusCode: number) {
    if (error.responseStatus) {
      this.responseStatus = error.responseStatus;
      this.message = `${this.responseStatus.errorCode}:${this.responseStatus.message}`;
      this.errorCode = this.responseStatus.errorCode;
    }
    if (statusCode === 0 || statusCode >= 500) {
      this.userVisible = true;
      this.message = 'msg.connectionError';
    }
  }
}
