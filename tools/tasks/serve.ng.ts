import * as util from 'gulp-util';

function reportError(message: string) {
  console.error(util.colors.white.bgRed.bold(message));
  process.exit(1);
}

//@TODO ugly
export = () => {
  const {spawnSync} = require('child_process');
  spawnSync('ng.cmd', ['serve', '--hmr'], {stdio: 'inherit'});
};
