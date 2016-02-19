// grab the things we need
var mongoose = require('mongoose');
require('mongoose-moment')(mongoose);
var Schema = mongoose.Schema;

// create a schema
var networkSchema = new Schema({
  name: String,
  guideUrl : String,
  streamUrl : String,
  color : String,
  desc : String,
  logoUrl : String
});

// the schema is useless so far
// we need to create a model using it
var Network = mongoose.model('Network', networkSchema);

// make this available to our users in our Node applications
module.exports = Network;