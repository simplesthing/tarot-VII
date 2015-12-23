/**
 * Created by avacollins on 12/22/15.
 */

var mongoose = require('mongoose');
var Position = mongoose.model('Position');

exports.index = function(request, response){
  var positions = Position.find({});
  positions.exec(function(err, positions){
    if(!err){
      response.send(positions);
    }
  });
};

