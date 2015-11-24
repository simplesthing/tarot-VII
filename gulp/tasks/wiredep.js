'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var wiredep      = require('wiredep').stream;

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function(){
  config.log('Wiring the bower dependencies into the html');

  return gulp
        .src(config.index)
        .pipe(wiredep(config.wiredep))
        .pipe(gulp.dest(config.src));
});
