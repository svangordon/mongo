
// Requires
var express = require('express')
  , router = express.Router()
  , emissions = require('../models/emissionSchema')
  , moment = require('moment')
  , requres = require('request')
  , db = require('./models')

  module.exports = {
  	day : {
  		all : function (req, res) {
  			console.log('getting all days')
  			db.Day.find({}, function (err, days) {
  				req.json(days)
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
  		}
  		,
  		data : function (req, res) {
  			console.log('getting day(s)')
  			var searchObj = {};
  			for (key in req.params) {
  				searchObj[key] = req.params[key]
  			};
  			db.Day.find(searchObj, function (err, days) {
  				res.json(days)
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
  				res.json(docs)
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
  			networkId = req.params._id
  			db.Network.findOne({_id : networkId}, function(err, network) {
  				if (err) throw err;
  				res.json(network)
  			})
  		}
  	}
  }