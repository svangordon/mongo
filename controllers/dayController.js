//  Requires \\
var express = require('express')
  , router = express.Router()
  , days = require('../models/daySchema')
  , moment = require('moment')
//  \\


router.get('/all', function(req, res) {
  days.find({}, function(err, docs) {
    res.send(docs)
  })
})

router.get('/', function(req, res) {
  //Query string : day in the format of yyyy-mm-dd, then a comma seperated string of which networks to find
  // if (req.query.networks === 'all') {
  //   selectorString = 
  // }
  
  // console.log(req.query)
  broadcastDay = req.query.day.split('-');
  broadcastDay[2] = parseInt(broadcastDay[2])
  // console.log(broadcastDay)
  var broadcastDay = moment.utc(broadcastDay.join('-')).valueOf() // Should be a unix timestamp. maybe that's a shit way to do it, but i'll find that out as i go i guess
  // console.log(moment.utc(broadcastDay).format())
  var queryObj = {
    date : broadcastDay,
    networkCallsign : {$in : []}
  }
  if (req.query.networks === 'all') {
    delete queryObj.networkCallsign
  } else {
    queryObj.networkCallsign.$in = req.query.networks.split(',')
  }
  // console.log(queryObj)
  days.find( queryObj, function (err, docs) {
    res.send(docs)
  } )
})

module.exports = router