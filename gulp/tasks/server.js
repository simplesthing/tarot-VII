'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var $              = require('gulp-load-plugins')({lazy : true});
var browserSync    = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');


gulp.task('server', function(){
  config.log('Server');

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === config.src || (util.isArray(baseDir) && baseDir.indexOf(config.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    var middle;
    if (util.isFunction(middleware)) {
      middle = middleware();
    } else {
      middle = middleware;
    }

    if(middle.length > 0) {
      // util.log('proxy found', middle);
      server.middleware = middle;
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });
  }

});
