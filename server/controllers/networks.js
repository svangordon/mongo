var express = require('express')
  , router = express.Router()

var networks = require('../models/networkSchema.js')

router.get('/all', function(req, res) {

	  networks.find( {} ,function(err, docs) {
			if (err) throw err
	    	res.send(docs)
	  	})
})


router.get('/:networkName', function (req, res) {
	var networkName = req.params.networkName
	networks.find({callsign : networkName}, function(err, docs) {
		res.send(docs[0])
	})
})

module.exports = router