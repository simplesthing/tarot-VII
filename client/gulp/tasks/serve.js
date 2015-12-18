'use strict';
// var config = require('../config');
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// TODO: condense callback for both env to take args for baseDir
function serveCallback() {
  browserSync.instance = browserSync.init({
      startPath: '/',
      notify  : false,
      port    : 3000,
      server: {
        baseDir    : ['build', './']
      }
  });
}

/**
 * Create a development build and serve files from /build
 */
gulp.task('serve', function(){
  runSequence( 'clean',
    ['appjs','sass','html','assets'],
    'watch',
    serveCallback
  );
});

gulp.task('serve:build', function(){
  serveCallback();
});
