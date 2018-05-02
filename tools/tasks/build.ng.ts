import * as util from 'gulp-util';
import Config from '../config';

export = () => {
  const {spawnSync} = require('child_process');
  spawnSync('ng.cmd', ['build', '--aot', `--base-href ${Config.APP_BASE}`, '--no-sourcemap', !Config.isDevelopment() ? '--prod' : ''], {stdio: 'inherit'});
};
