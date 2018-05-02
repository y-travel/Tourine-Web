export = () => {
  const {spawnSync} = require('child_process');
  spawnSync('ng.cmd', ['serve', '--hmr', '--open'], {stdio: 'inherit'});
};
