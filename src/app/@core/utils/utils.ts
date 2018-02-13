export class Utils {

  disableBrowserRefresh = false;

  getApiPath(object) {
    return Reflect.get(object, "apiPath");
  }

  getHttpMethod(object) {
    return Reflect.get(object, "httpMethod");
  }
}


