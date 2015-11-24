'use strict';

var config = require('../config');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var browserSync = require('browser-sync');

gulp.task('appjs', function(){


  return gulp.src(config.appjs)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(browserSync.reload({
          stream: true 
        }))
        .pipe(gulp.dest(config.build));
});
