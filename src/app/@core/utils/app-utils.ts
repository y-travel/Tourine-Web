import { InjectionToken } from "@angular/core";
//@TODO change to static injection 

export class AppUtils {

  disableBrowserRefresh = false;
  constructor(){}

  getApiPath(object) {
    return Reflect.get(object, "apiPath");
  }

  getHttpMethod(object) {
    return Reflect.get(object, "httpMethod");
  }

  isNullorUndefined(obj: any) {
    return obj === undefined || obj === null;
  }

  getEnumNames(item: any): string[] {
    return Object.keys(item).map((x: any) => item[x]).filter(x => typeof x === "string");
  }
}
export const UTILS =new InjectionToken<AppUtils>("app-utils");

export const UTILS_INSTANCE = new AppUtils();

