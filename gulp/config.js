'use strict';

var log          = require('./util/log');
var errorHandler = require('./util/errorHandler');

var Config = {
  app: './app',
  index: './app/index.html',
  appjs: ['./app/**/*.js', '!./app/**/test/**'],
  styles: './app/**/*.scss',
  images: './app/images/**',
  json:'./app/models/*.json',
  build: './build',
  log: log,
  errorHandler : errorHandler
};

module.exports = Config;
