var fs = require('fs')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/guignol')
var Networks = require('../models/networkSchema')
var networkList = require('../data/networks.json')

console.log(typeof networkList)


networkList.forEach(function(cur) {
	var newNetwork = new Networks(cur);
	newNetwork.save(function(err, data) {
		if (err) throw err
	})
})