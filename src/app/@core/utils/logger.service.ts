import { Injectable, InjectionToken } from '@angular/core';

//@Todo Implement

@Injectable()
export class LoggerService {

  originConsoleError = (message?: any, ...optionalParams: any[]) => {
  }

  constructor() {
    this.originConsoleError = console.error;
    //crack ag-grid license error
    console.error = (message?: any, ...optionalParams: any[]) => {
        if (typeof message === 'string' && ( message.toLowerCase().includes('license') || message.includes('****'))) {
        return;
        }
      this.originConsoleError(message, optionalParams);
    };
  }

  logInfo(message) {
  }

  logError(message) {
    console.error(message);
  }

  logFatal(message) {
    console.error(message);
  }
}

export const LOGGER = new InjectionToken<LoggerService>('logger.service');
export const LOGGER_INSTANCE = new LoggerService();
