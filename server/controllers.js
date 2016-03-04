
// Requires
var express = require('express')
  , router = express.Router()
  , moment = require('moment')
  , request = require('request')
  , db = require('./models')

  module.exports = {
  	day : {
  		all : function (req, res) {
  			console.log('getting all days')
  			db.Day.find({}, function (err, days) {
  				res.json(days)
  			})
  		},
  		upsert : function (req, res) {
  			console.log('upserting day');
  			var day = new db.Day(req.body);
  			var options = {upsert : true, new : true}
  			db.Day.findOneAndUpdate({_id : day._id}, day, options, function (err, doc) {
  				if (err) throw err
				console.log('doc updated')
				res.json(doc)
  			})
  		},
  		data : function (req, res) {
  			console.log('getting day(s)')
  			var dayId = req.params.id  			
  			db.Day.find({_id : dayId}, function (err, days) {
  				res.json(days)
  			})
  		},
  		find : function (req, res) {
  			var dayNet = req.params.network
  			, dayDate = req.params.date;
  			db.Day.find({date : dayDate, callsign : dayNet}, function (err, day) {
  				res.json(day)
  			})
  		},
  		delete : function (req, res) {
  			console.log('deleting day')
  			db.Day.findByIdAndRemove({_id : req.params.id}, function (err, network) {
  				if (err) throw err;
  				res.json({success : true})
  			})
  		}
  	},
  	network : {
  		all : function (req, res) {
  			console.log('getting all networks')
  			db.Network.find({}, function (err, networks) {
  				if (err) throw err
  				res.json(networks)
  			})
  		},
  		delete : function (req, res) {
  			console.log('delete network user request');
  			db.Network.findByIdAndRemove({_id: req.params.id}, function (err, network) {
  				if (err) throw err
				res.json({success:true})
  			})
  		},
  		upsert : function (req, res) {
  			console.log('upserting network');
  			var network = new db.Network(req.body);
  			var options = {upsert : true, new : true}
  			db.Network.findOneAndUpdate({_id : network._id}, network, options, function (err, doc) {
  				if (err) throw err
				console.log('doc updated')
				res.json(doc)
  			})
  		},
  		data : function (req, res) {
  			console.log('returning network');
  			var networkId = req.params.id;
  			db.Network.findOne({_id : networkId}, function(err, network) {
  				if (err) throw err;
  				res.json(network)
  			})
  		}
  	}
  }