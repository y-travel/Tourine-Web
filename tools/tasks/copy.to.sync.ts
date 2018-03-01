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
    join(Config.DIST_DIR, '**'),
    '!' + join(Config.DIST_DIR, '**', '*.js.map'),
    ...changeFileManager.lastChangedFiles,
  ])
    .pipe(gulp.dest(Config.SyncPath));
};
