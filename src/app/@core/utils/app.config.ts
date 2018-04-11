import { InjectionToken } from "@angular/core";

export class AppConfig {
  Server: string;
  ApiUrl: string;

  constructor() {
    const hostname = window.location.origin ? window.location.origin
      : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    this.Server = hostname.includes("localhost") ? "http://www.tourine.ir" : hostname;
    this.ApiUrl = this.Server + "/api/";
  }
}

export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export const APP_CONFIG_INSTANCE = new AppConfig();
