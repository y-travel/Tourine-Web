import * as util from 'gulp-util';
import Config from '../../config';

function reportError(message: string) {
  console.error(util.colors.white.bgRed.bold(message));
  process.exit(1);
}

//@TODO ugly
export = () => {
  const {spawnSync} = require('child_process');
  spawnSync('ng.cmd', ['build', '--aot', `--base-href ${Config.APP_BASE}`, '--no-sourcemap'], {stdio: 'inherit'});
};
