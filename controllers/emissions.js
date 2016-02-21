//  Requires \\
var express = require('express')
  , router = express.Router()
  , emissions = require('../models/emissionSchema')
  , moment = require('moment')
//  \\


router.get('/all', function(req, res) {
  console.log(req.query)
  emissions.find({}, function(err, docs) {
    res.send(docs)
  })
})

router.get('/', function(req, res) {
  var networks = req.query.networks.split(',')
  var dayStart = moment(parseInt(req.query.day)) // Should be a unix timestamp. maybe that's a shit way to do it, but i'll find that out as i go i guess
  var dayEnd = moment(dayStart).add(1,'d')

  console.log('dayStart:',dayStart.valueOf())
  emissions.find({}, {start : 1}, function(err, docs) {
    console.log(docs)
  })
  emissions.find( { network : {$in : networks}, start : { $gte : dayStart.valueOf()}, end: {$lte : dayEnd.valueOf()} }, function (err, docs) {
    res.send(docs)
    // console.log(docs)
  } )
})

module.exports = router