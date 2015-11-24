'use strict';

var log          = require('./util/log');
var errorHandler = require('./util/errorHandler');

var Config = {
  app: './app',
  index: './app/index.html',
  appjs: ['./app/**/*.js'],
  build: './build',
  log: log,
  errorHandler : errorHandler
};

module.exports = Config;
