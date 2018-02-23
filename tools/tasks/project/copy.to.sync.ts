import * as gulp from 'gulp';
import { join } from 'path';

import Config from '../../config';

/**
 * This sample task copies all TypeScript files over to the appropriate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  return gulp.src(join(Config.DIST_DIR,'**','*'))
    .pipe(gulp.dest(Config.SyncPath));
};
