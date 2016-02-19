var request = require('request')
var xml2js = require('xml2js')
var fs = require('fs')
var util = require('util')

// Setup parser \\
var parser = new xml2js.Parser({explicitArray : false})

// connect to server
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/wafflehouse')
var dishes = require('../models/dishesSchema')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {


	console.log('db open')

	// Make http request \\
	request('http://www.w3schools.com/xml/simple.xml', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        parser.parseString(body, function (err, result) {
        		if (err) throw err
        		// console.log(util.inspect(result, false, null))
	        	var plates = result.breakfast_menu.food
	        	plates.forEach(function(cur,i,arr) {
	        		var newPlate = new dishes(cur);
	        		newPlate.save(function(err,doc) {
	        			if (err) throw err
	        			console.log(newPlate.name + ' is saved')
	        		})
	        	})
	        	// dishes.insert(plates, function (err, docs) {
	        	// 	if (err) throw err
	        	// 	console.info('%d potatoes were successfully stored.', docs.length)
	        	// })
	        })
	    }
	});



	
})


// Mongose schemas





