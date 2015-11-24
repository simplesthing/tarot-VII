'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')({lazy: true});
var browserSync = require('browser-sync');

gulp.task('jshint:app', function(){
  config.log('Linting appjs');

  return  gulp
         .src(config.srcjs)
         .pipe($.jshint())
         .pipe($.jshint.reporter('jshint-stylish'))
         .pipe(browserSync.reload({
            stream: true 
         }))
         .pipe($.size());
});

gulp.task('jshint:gulp', function(){
  config.log('Linting gulp files');

    return  gulp
           .src(config.gulpjs)
           .pipe($.jshint())
           .pipe($.jshint.reporter('jshint-stylish'))
           .pipe(browserSync.reload({
              stream: true 
           }))
           .pipe($.size());
});

gulp.task('jshint', ['jshint:app', 'jshint:gulp']);
