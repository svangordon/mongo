var express = require('express')
  , router = express.Router()

var networks = require('../models/networkSchema.js')

router.get('/all', function(req, res) {

	  networks.find( {} ,function(err, docs) {
			if (err) throw err
	    	res.send(docs)
	  	})
})

router.get('/', function (req, res) {
	
})

module.exports = router