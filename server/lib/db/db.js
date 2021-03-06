/**
 * Created by avacollins on 12/19/15.
 */
var config = require('../config/config');
var mongoose = require('mongoose');

exports.mongoose = mongoose;

//EVENTS
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to '+ config.db);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

var mongoOptions = { db: { safe: true} };

exports.db = mongoose.connect(config.db, mongoOptions, function (err, res){
  if(err) {
    console.log('ERROR connecting to ' + config.db + '.' + err);
  }
});
