/**
 * Created by avacollins on 12/19/15.
 */
var express = require('express');
var path = require('path');
var cards = require('../controllers/card');
var positions = require('../controllers/position');
var readings = require('../controllers/reading');
var static_path = path.join(__dirname, '..', '..', '..', 'client', 'build');
console.log(static_path)
module.exports = function(app){
  //STATIC
  app.use('/', express.static(static_path));
  //API
  app.get('/api/cards', cards.index)
  app.get('/api/cards/:name', cards.name);
  app.get('/api/positions', positions.index);
  app.get('/api/positions/:name', positions.name);
  app.get('/api/readings', readings.index);
  app.get('/api/readings/:position/:name', readings.name);
};
