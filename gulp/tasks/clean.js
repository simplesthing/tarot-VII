'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var del          = require('del');

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done){
  config.log('Cleaning: ' + path);
  del(path, done);
}

gulp.task('clean:build', function(done){
  clean(config.build, done);
});
// gulp.task('clean:fonts', function(done) {
//   clean(config.fonts, done);
// });

// gulp.task('clean:css', function(done) {
//   clean(config.css, done);
// });

// gulp.task('clean',['clean:build']);
