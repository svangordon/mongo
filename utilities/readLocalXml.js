var xml2js = require('xml2js')
var fs = require('fs')
var mongoose = require('mongoose')
var util = require('util')
var moment = require('moment')


// Setup parser \\
var parser = new xml2js.Parser({explicitArray : false})

// Setup mongo \\
mongoose.connect('mongodb://localhost/guignol')
var db = mongoose.connection;
var Days = require('../models/daySchema')

// Read File \\
fs.readFile('./data/bbc1.xml', 'utf8', function (err, data) {
	if (err) throw err
	parser.parseString(data, function (err, results) {
		if (err) throw err
		
		// Set some of the params \\
			// results = results.channel;
			var date = results.channel.$.date.split('/');
			var networkCallsign = results.channel.$.id
			var day = parseInt(date[0]) - 1
			var month = parseInt(date[1]) -1
			var year = parseInt(date[2])
			// console.log(results.channel.$.date)
			var dayCutoff = moment.utc([year, month, day, 06, 01]) // so anything before this needs to be moved to the next day
			var broadcastDay = moment.utc([year,month,day])

			var programmes = results.channel.programme;

			function hrMin (timeString) {
				hour = parseInt(timeString.slice(0,2));
				min = parseInt(timeString.slice(2))
				return [hour, min]
			}

			function checkCutoff (time) {
				return time.isBefore(dayCutoff) ? time.add(1,'d') : time
			}

		// Iterate over emissions and add them all to an array
			var emissionsArray = [];

			programmes.forEach(function(cur) {
				var startHour = hrMin(cur.start)[0]
				var startMinute = hrMin(cur.start)[1]
				var startTime = checkCutoff(moment.utc([year, month, day, startHour, startMinute ]))
				var endHour = hrMin(cur.end)[0]
				var endMinute = hrMin(cur.end)[1]
				var endTime = checkCutoff(moment.utc([year, month, day, endHour, endMinute]))
				// console.log(cur.start, startTime.format())
				var out = {
					title : cur.title,
					network : networkCallsign,
					start : startTime,
					end : endTime,
					desc : cur.desc
				}
				emissionsArray.push(out)
			})
			var newDay = {
				networkCallsign : networkCallsign,
				date : broadcastDay,
				emissions : emissionsArray
			}
			var newDay = new Days(newDay);
			newDay.save(function(err, docs) {
				if (err) {
					console.log(emissions)
					// throw err
				}
				console.log('saved')
			})
	})
})