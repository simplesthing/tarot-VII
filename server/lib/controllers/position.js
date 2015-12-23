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

exports.name = function(request, response){
  var name = request.params.name;
  var position = Position.find({
    name: name
  });
  position.exec(function(err, position){
    if(!err){
      response.send(position);
    }
  });
};
