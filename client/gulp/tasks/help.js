'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var p      = require('../../package.json');

gulp.task('help:app', function(){
  var lineLength     = 48,
      packageName    = p.name,
      packageNameLen = packageName.length,
      tagLine        = '';

  if( packageNameLen < lineLength) {
      var prependSpace     = '',
          appendSpace      = '',
          addSpaces        = (lineLength-packageNameLen)/2;
      while (prependSpace.length < addSpaces) {
          prependSpace  += ' ';
          appendSpace   += ' ';
      }
      tagLine =prependSpace+packageName+appendSpace;
      config.log(tagLine.length, lineLength);
      if( tagLine.length <= lineLength) {
          tagLine += ' ';
      }
  }
// TODO list avaiable tasks
  config.log(
    ' \n' +
    '            '+$.util.colors.white.bgMagenta.bold('                                                 ')+' \n' +
    '            '+$.util.colors.white.bgMagenta.bold(tagLine)+' \n' +
    '            '+$.util.colors.white.bgMagenta.bold('                                                 ')+' \n' +
    ' \n' +
    ' \n' +
    ' \n'
  );

});

gulp.task('help:tasks', $.taskListing);

gulp.task('help', ['help:app', 'help:tasks']);
