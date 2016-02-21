// grab the things we need
var mongoose = require('mongoose');
// require('mongoose-moment')(mongoose);
var Schema = mongoose.Schema;

// create a schema
var emissionSchema = new Schema({
  title: String,
  network: String,
  start : 'Moment',
  end : 'Moment',
  desc : String
});

emissionSchema.methods.visibleMinutes = function (viewStart, viewEnd) {
	return start
}

// the schema is useless so far
// we need to create a model using it
var Emission = mongoose.model('Emission', emissionSchema);

// make this available to our users in our Node applications
module.exports = Emission;