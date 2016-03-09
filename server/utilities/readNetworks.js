var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/guignol');
var Networks = require('../models/networkSchema');
var networkList = require('../data/networks.json');


networkList.forEach(function(cur) {
	var newNetwork = new Networks(cur);
	newNetwork.save(function(err, data) {
		if (err) throw err
		console.log('saved', newNetwork.callsign)
	})
})

console.log('finished')