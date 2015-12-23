/**
 * Created by avacollins on 12/22/15.
 */
var mongoose = require('mongoose');

var ReadingSchema = new mongoose.Schema({
  "name": String,
  "situation":String,
  "challenge":String,
  "crown":String,
  "root":String,
  "past":String,
  "future":String,
  "self":String,
  "influences":String,
  "hope":String,
  "outcome":String
});

mongoose.model('Reading', ReadingSchema);
