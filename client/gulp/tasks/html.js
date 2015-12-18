'use strict';

var config = require('../config');
var gulp = require('gulp');
var browserSync  = require('browser-sync');

gulp.task('html', function(){
  return gulp.src(config.index)
        .pipe(gulp.dest(config.build))
        .pipe(browserSync.reload({
            stream: true 
          }));
});
