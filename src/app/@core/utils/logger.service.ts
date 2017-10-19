import { Injectable } from "@angular/core";

//@Todo Implement

@Injectable()
export class LoggerService {

    static logInfo(message) {
        console.info(message);
    }

    static logError(message) {
        console.error(message);
    }

    static logFatal(message) {
        console.error(message);
    }

}