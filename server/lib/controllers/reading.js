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
