/**
 * Created by avacollins on 12/22/15.
 */

var mongoose = require('mongoose');
var Reading = mongoose.model('Reading');

exports.index = function(request, response){
  var readings = Reading.find({});
  readings.exec(function(err, readings){
    if(!err){
      response.send(readings);
    }
  });
};

exports.name = function(request, response){
  var position = request.params.position;
  var name = request.params.name;
  var reading = Reading.find({
    "name": name
  });
  reading.exec(function(err, reading){
    if(!err){
      response.send({reading:reading[0][position]});
    }
  });
}
