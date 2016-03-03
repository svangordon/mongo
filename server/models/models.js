// Requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var daySchema = new Schema({
  callsign : String,
  date : Number,
  emissions : [{
                title : String,
                start : Number,
                end : Number,
                desc : String
              }] 
});

var emissionSchema = new Schema({
  title: String,
  network: String,
  start : Number,
  end : Number,
  desc : String
});

var networkSchema = new Schema({
  name: String,
  callsign: String,
  guideUrl : String,
  streamUrl : String,
  logo : String,
  color : String,
});


module.exports = {
	Network : mongoose.model('Network', networkSchema),
	// Emission : mongoose.model('Emission', emissionSchema), // Pretty sure this is never used
	Day : mongoose.model('Day', daySchema)
}