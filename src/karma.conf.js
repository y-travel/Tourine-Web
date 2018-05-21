// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    files: [
      // RxJs.
      { pattern: '../node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: '../node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // paths loaded via module imports
      // Angular itself
      { pattern: '../node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: '../node_modules/@angular/**/*.js.map', included: false, watched: false },

      // Advanced seed
      { pattern: '../node_modules/lodash/**/*.js', included: false, watched: false },
      { pattern: '../node_modules/@ngx-translate/**/*.js', included: false, watched: false },

      // suppress annoying 404 warnings for resources, images, etc.

    ],
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
