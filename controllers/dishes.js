var express = require('express')
  , router = express.Router()

var dishes = require('../models/dishesSchema.js')

router.get('/all', function(req, res) {

	  dishes.find( {} ,function(err, docs) {
			if (err) throw err
	    	res.send({dishes: docs})
	  	})
})

module.exports = router