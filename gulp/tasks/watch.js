'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch:appjs', function(){
  config.log('Watching appjs');

  gulp.watch(config.appjs, {
      name: 'scripts'
    }, function(event){
      if (isOnlyChange(event)) {
        runSequence('jshint');
      } else {
        runSequence('jshint', 'inject:js');
      }
    }
  );
});

gulp.task('watch:gulpjs', function(){
  config.log('Watching gulpjs');

  gulp.watch(config.gulpjs, ['jshint:gulp']);
});

gulp.task('watch:sass', function(){
  config.log('Watching sass');

  gulp.watch([config.app + '/**/*.scss', config.src + '/sass/**/*scss'], ['sass']);
});




gulp.task('watch', ['watch:appjs', 'watch:gulpjs', 'watch:sass']);
