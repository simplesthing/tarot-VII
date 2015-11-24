'use strict';

var config       = require('../config');
var gulp         = require('gulp');

gulp.task('fonts', function(){
  config.log('Copying fonts');

  var fonts = [config.wiredep.directory + 'fontawesome/fonts/**/*.*'];

  return  gulp
          .src(fonts)
          .pipe(gulp.dest(config.fonts));
});
