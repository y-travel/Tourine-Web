import { config } from "../config";
import * as rimraf from "rimraf";
import * as util from "gulp-util";
import { Task } from "./base/task";


/**
 * Executes the build process, cleaning all files within the `/dist/dev` and `dist/tmp` directory.
 */
export = class CleanServer extends Task {
    run(done: any) {
        const path = config.SERVER_SRC;
        return new Promise(resolve => {
            rimraf(path, e => {
                if (e) {
                    util.log('Clean task failed with', e);
                } else {
                    util.log('Deleted', util.colors.yellow(path || '-'));
                }
                resolve();
            });
        }).catch(e => {
            util.log(util.colors.red(`Error while removing files "${path}", ${e}`));
        });
    }
};
