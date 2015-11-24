'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('html', function(){
  return gulp.src(config.index)
        .pipe(gulp.dest(config.build));
});
