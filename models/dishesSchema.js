var mongoose = require('mongoose')

var dishSchema = mongoose.Schema({
	name : String,
	price : String,
	description : String,
	calories : Number
})

var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish