// Requires \\
var bodyParser = require('body-parser');
var logger = require('morgan');
var ajax = require('ajax')
var mongoose = require('mongoose')
require('mongoose-moment')(mongoose);
var apiRoutes = require('./api_routes.js')
var config = require('./config.js')

// connect to mongodb
var mUrl = config.ENV === 'local' ? config.MROUTE : 'mongodb://localhost:27017/guignol'
mongoose.connect(mUrl)

var express = require('express')
  , app = express()

// var db = require('./db')

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));

// controllers \\

app.use('/api', apiRoutes)

app.get('/', function (req, res) {
	res.sendFile('index.html', {root : '../client/html'})
})

app.get('/privacy', function (req, res) {
	res.sendFile('privacy.html', {root : '../client/html'})
})


app.listen(80, function() {
  console.log('Listening on port 80...')
})
