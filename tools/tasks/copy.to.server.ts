import * as gulp from 'gulp';
import { join } from 'path';

import { config } from '../config';

/**
 * This sample task copies all TypeScript files over to the appropriate `dist/dev|prod|test` directory, depending on the
 * current application environment.
 */
export = () => {
  return gulp.src(join(config.APP_DEST, '**', '*'))
    .pipe(gulp.dest(config.SERVER_SRC));
};
