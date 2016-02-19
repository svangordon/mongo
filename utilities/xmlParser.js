var request = require('request')
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"

// connect to server
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/wafflehouse')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {

	// Establish schemas \\
	var dishSchema = mongoose.Schema({
		name : String,
		price : String,
		desc : String,
		cal : Number
	})

	var Dish = mongoose.model('Dish', dishSchema);


	// console.log

	// Make http request \\
	request('http://www.w3schools.com/xml/simple.xml', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        parseString(body, function (err, result) {
	        	if (err) throw err
	        	var food = result.breakfast_menu.food
	        	// console.log(db)
	        	var peas = new Dish({ name : peas })
	        	// db.collection('plates').drop()
	        	// db.collection('plates').insert(food);
	        	// db.collection('plates').save(function (err, fluffy) {
	        		// if (err) return console.error(err)
	        	// })
	        	// console.log(food)
	        })
	    }
	});



	
})


// Mongose schemas





