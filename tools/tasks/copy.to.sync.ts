import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../config';
import { changeFileManager } from '../utils/code_change_tools';

/**
 * This sample task copies all TypeScript files over to the appropriate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  console.log(`current sync path is${Config.SyncPath}`);
  return gulp.src([
    join(Config.APP_DEST, '**'),
    '!' + join(Config.APP_DEST, '**', '*.js.map'),
    ...changeFileManager.lastChangedFiles,
  ])
    .pipe(gulp.dest(Config.SyncPath));
};
