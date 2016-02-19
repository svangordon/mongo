var express = require('express')
  , router = express.Router()

var db = require('../db')

router.get('/all', function(req, res) {
  var collection = db.get().collection('networks')

  collection.find().toArray(function(err, docs) {
    if (err) throw err
    res.render('networks', {networks: docs})
  })
})

router.get('/:network', function(req, res) {
  var collection = db.get().collection('networks')
  var networkName = req.params.network

  collection.find( { name : networkName } ).toArray( function (err, docs) {
  	if (err) throw err
    res.render('networks', {networks: docs})
  })
})

module.exports = router