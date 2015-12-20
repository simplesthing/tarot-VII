/**
 * Created by avacollins on 12/19/15.
 */

var mongoose = require('mongoose');
var cardSchema = require('../db/schemas/card')
var Card = mongoose.model('Card', cardSchema);


//GET
exports.index = function(request, response){
  response.send('cards');
  console.log(Cards)
};
//POST
exports.new = function(request, response){
  response.send('new');
};
//PUT
exports.update = function(request, response){
  response.send('update');
};
//DELETE
exports.delete = function(request, response){
  response.send('delete');
};
