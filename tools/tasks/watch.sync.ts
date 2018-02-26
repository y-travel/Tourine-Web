import { watch } from '../utils/index';
import Config from '../config';
/**
 * Executes the build process, watching for file changes and rebuilding the development environment.
 */
export = watch('copy.to.sync', Config.DIST_DIR);
