// Requires \\
var bodyParser = require('body-parser');
var logger = require('morgan');
var ajax = require('ajax')


var express = require('express')
  , app = express()

var db = require('./db')

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// configuring mongoose schemas \\

// controllers \\
app.use('/networks', require('./controllers/networks'))
// app.use('/users', require('./controllers/users'))

app.get('/', function (req, res) {
	res.sendFile('index.html', {root : './public/html'})
})




// Connect to Mongo on start
db.connect('mongodb://localhost:27017/test', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {

    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})