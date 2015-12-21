/**
 * Created by avacollins on 12/19/15.
 */

var mongoose = require('mongoose');
var Card = mongoose.model('Card');


var newCard = new Card({
  name:'Fool'
})

newCard.save( function( err, card ){
  if(!err){
    console.log('Card saved! ' + card.name);
  }
});

//GET
exports.index = function(request, response){
  response.send('cards');
};
