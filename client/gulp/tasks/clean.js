'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var del          = require('del');

/**
 * Delete all files in a given path
 */
gulp.task('clean', function(){
  return del(config.build);
});

