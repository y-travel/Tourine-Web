import { InjectionToken } from '@angular/core';
import { OptionType } from '../data/models/enums';
import { map } from 'rxjs/operators';

//@TODO change to static injection

export class AppUtils {

  disableBrowserRefresh = false;

  constructor() {
  }

  getApiPath(object) {
    return Reflect.get(object, 'apiPath');
  }

  getHttpMethod(object) {
    return Reflect.get(object, 'httpMethod');
  }

  isNullOrUndefined(obj: any) {
    return obj === undefined || obj === null;
  }

  getEnumNames(item: any): string[] {
    return Object.keys(item).map((x: any) => item[x]).filter(x => typeof x === 'string');
  }

  mapOptionTypeToIcon(type: OptionType): string {
    switch (type) {
      case(OptionType.Room):
        return 'hotel';
      case(OptionType.Bus):
        return 'directions_bus';
      case (OptionType.Food):
        return 'restaurant';
    }
  }

  setDelayFocus(control, timeout = 400) {
    setTimeout(() => control.focus(), timeout);
  }
}

export const UTILS = new InjectionToken<AppUtils>('app-utils');

export const UTILS_INSTANCE = new AppUtils();

