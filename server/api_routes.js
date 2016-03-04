var ctrls = require('./controllers.js')
, apiRouter = require('express').Router()

// Network Routes
apiRouter.route('/networks')
	.get(ctrls.network.all)
	.put(ctrls.network.upsert)

apiRouter.route('/network/:id')
	.get(ctrls.network.data)
	.post(ctrls.network.upsert)
	.delete(ctrls.network.delete)

// Day routes
apiRouter.route('/days')
	.get(ctrls.day.all)
	.put(ctrls.day.upsert)

apiRouter.route('/day/search/:network/:date')
	.get(ctrls.day.find)

apiRouter.route('/day/id/:id')
	.get(ctrls.day.data)
	.put(ctrls.day.upsert)
	.delete(ctrls.day.delete)

module.exports = apiRouter