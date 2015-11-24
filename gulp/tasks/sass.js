'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')({lazy: true});
var browserSync  = require('browser-sync');

gulp.task('sass', function(){
  config.log('Compiling SASS --> CSS');

  return  gulp
          .src(config.sass)
          .pipe($.sass(config.sass)).on('error', config.errorHandler('Sass'))
          .pipe($.autoprefixer()).on('error', config.errorHandler('Autoprefixer'))
          .pipe($.sourcemaps.write('./'))
          .pipe(gulp.dest(config.css))
          .pipe(browserSync.reload({
            stream: true 
          }));
});
