// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// TODO: Figure out why this is sometimes needed and sometimes not, then fix it
// require('mongoose-moment')(mongoose); // Sometimes this needs to be here, sometimes it doesn't
// well it's got something to do w/ running the localxml parser
var emission = require('./emissionSchema')

// create a schema
var daySchema = new Schema({
  // network_id: Schema.Types.ObjectId, // Unsure if this makes sense, or if i should just include network callsign
  networkCallsign : String,
  date : 'Moment',
  emissions : [{
                title : String,
                start : 'Moment',
                end : 'Moment',
                desc : String
              }] 
});

// the schema is useless so far
// we need to create a model using it
var Day = mongoose.model('Day', daySchema);

// make this available to our users in our Node applications
module.exports = Day;
