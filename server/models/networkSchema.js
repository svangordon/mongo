// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var networkSchema = new Schema({
  name: String,
  callsign: String,
  guideUrl : String,
  streamUrl : String,
  logo : String,
  color : String,
});

// the schema is useless so far
// we need to create a model using it
var Network = mongoose.model('Network', networkSchema);

// make this available to our users in our Node applications
module.exports = Network;