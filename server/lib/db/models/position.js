/**
 * Created by avacollins on 12/22/15.
 */

var mongoose = require('mongoose');

var PositionSchema = new mongoose.Schema({
  name: String,
  meaning: String
});

mongoose.model('Position', PositionSchema);
