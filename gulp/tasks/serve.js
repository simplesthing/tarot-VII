'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('serve', function(){
  runSequence(
      'clean',
      ['wiredep', 'fonts', 'inject'],
      'watch'
    );
});
