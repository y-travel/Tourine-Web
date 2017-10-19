
export class Helper {

    disableBrowserRefresh = false;

    static getApiPath(object) {
        return Reflect.get(object, "apiPath");
    }

    static getHttpMethod(object) {
        return Reflect.get(object, "httpMethod");
    }

    static createApiPath(path: string, object): string {
        var newPath = path;
        for (const field in object) {
            newPath = newPath.replace(`{${field}}`, object[field]);
        }
        return newPath;
    }

}

