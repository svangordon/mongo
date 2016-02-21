// Requires \\
var bodyParser = require('body-parser');
var logger = require('morgan');
var ajax = require('ajax')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/guignol')

var express = require('express')
  , app = express()

// var db = require('./db')

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// controllers \\
app.use('/networks', require('./controllers/networks'))
app.use('/emissions', require('./controllers/emissions'))
app.use('/days', require('./controllers/dayController'))

app.get('/', function (req, res) {
	res.sendFile('index.html', {root : './public/html'})
})


app.listen(3000, function() {
  console.log('Listening on port 3000...')
})