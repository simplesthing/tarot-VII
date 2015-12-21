/**
 * Created by avacollins on 12/19/15.
 */

var mongoose = require('mongoose');
var Card = mongoose.model('Card');

//GET
exports.index = function(request, response){
  var allCards = Card.find({});
  allCards.exec(function(err, cards){
    if(!err){
      response.send(cards);
    }
  });


};
