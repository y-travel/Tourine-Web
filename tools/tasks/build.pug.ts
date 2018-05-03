import * as gulp from 'gulp';
import { join } from 'path';
import { config } from '../config';

const pug = require('gulp-pug');
const rename = require('gulp-rename');

export = () => {
  return gulp.src(join(config.APP_SRC, '**/*.pug'))
    .pipe(pug({
      doctype: 'html',
      pretty: config.isDevelopment(),
      data: {
        config: JSON.stringify(config),
      },
    }))
    .pipe(rename({extname: '.gen.html'}))
    .pipe(gulp.dest(config.APP_SRC));
};
