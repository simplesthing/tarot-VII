'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('json', function(){
  return gulp.src(config.json, {base: './app'})
        .pipe(gulp.dest(config.build));
});


gulp.task('images', function(){
  return gulp.src(config.images, {base:'./app'})
        .pipe(gulp.dest(config.build));
});

gulp.task('assets', ['json','images']);
