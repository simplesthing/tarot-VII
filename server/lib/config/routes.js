/**
 * Created by avacollins on 12/19/15.
 */
var cards = require('../controllers/card');
var positions = require('../controllers/position');
var readings = require('../controllers/reading');

module.exports = function(app){
  //STATIC
  app.get('/', function(request, response){
    response.send('root');
  });
  //API
  app.get('/api/cards', cards.index)
  app.get('/api/cards/:name', cards.name);
  app.get('/api/positions', positions.index);
  app.get('/api/positions/:name', positions.name);
  app.get('/api/readings', readings.index);
  app.get('/api/readings/:position/:name', readings.name);
};
