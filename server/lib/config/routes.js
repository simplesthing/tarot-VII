/**
 * Created by avacollins on 12/19/15.
 */
var cards = require('../controllers/cards');

module.exports = function(app){

  //STATIC
  app.get('/', function(request, response){
    response.send('root');
  });

  //API
  app.get('/api/cards', cards.index)

};
