'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')({lazy: true});

gulp.task('inject:js', function(){
  config.log('Injecting appjs');

  var scripts = gulp
                .src(config.appjs)
                .pipe($.angularFilesort()).on('error', config.errorHandler('AngularFilesort'));

  return  gulp.src(config.index)
          .pipe($.inject(scripts, config.inject))
          .pipe(gulp.dest(config.src));
});

gulp.task('inject:css', function(){
  config.log('Injecting CSS');

  var css = gulp.src(config.css + '/styles.css');

  return  gulp
          .src(config.index)
          .pipe($.inject(css, config.inject))
          .pipe(gulp.dest(config.src));
});

gulp.task('inject', ['inject:js', 'inject:css']);

