'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('watch:appjs', function(){
  config.log('Watching appjs');

  gulp.watch(config.appjs, ['appjs']);
});

gulp.task('watch:sass', function(){
  config.log('Watching sass');

  gulp.watch([config.styles], ['sass']);
});


gulp.task('watch:index', function(){
  config.log('Watching index');

  gulp.watch([config.index], ['html']);
});




gulp.task('watch', ['watch:appjs', 'watch:sass','watch:index']);
