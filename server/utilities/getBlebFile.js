// STATUS: Works as intended right now.
// TODO: Set it up so that this automatically calls itself, on multiple days,
// for a stated array of days
var request = require('request')
var xml2js = require('xml2js')
var fs = require('fs')
var util = require('util')
var moment = require('moment')

// Setup parser \\
var parser = new xml2js.Parser({explicitArray : false})

// connect to server
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/guignol')
// TODO: Once this is folded into the main server.js and called from there,
// this require will need to be moved to that part of the code
require('mongoose-moment')(mongoose);
var Days = require('../models/daySchema')


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {


	console.log('db open')

	var options = {
		url : 'http://bleb.org/tv/data/listings/1/bbc1.xml',
		headers : {
			'User-Agent' : 'stephen.van.gordon@gmail.com'
		}
	}

	// Make http request \\
	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        parser.parseString(body, function (err, results) {
        		if (err) throw err
        		
        	// Set some of the params \\
				// results = results.channel;
				var networkCallsign = results.channel.$.id
				var date = results.channel.$.date.split('/');
				var day = parseInt(date[0]) // Idk if these +/-1's are actually donig anything. oh wait
				var month = parseInt(date[1]) - 1 // Months are 0-offset but not days? weird
				var year = parseInt(date[2])
				var dayCutoff = moment.utc([year, month, day, 06, 00]) // so anything before this needs to be moved to the next day
				var broadcastDay = moment.utc([year,month,day])
				var dayRollover = false
				var dayStart;
				var programmes = results.channel.programme;

				function hrMin (timeString) {
					hour = parseInt(timeString.slice(0,2));
					min = parseInt(timeString.slice(2))
					return [hour, min]
				}

				function checkRollover (progTime, i, arr) {
					if (i === 0) {
						dayStart = progTime
						return progTime
					}

					if (progTime < dayStart) {
						dayRollover = true
					}
					if (dayRollover)
						return (progTime.add(1,'d'))
					else
						return progTime
				}


				function checkCutoff (time) {
					return time.isBefore(dayCutoff) ? time.add(1,'d') : time
				}

			// Iterate over emissions and add them all to an array
				var emissionsArray = [];

				programmes.forEach(function(cur, i, arr) {
					var startHour = hrMin(cur.start)[0]
					var startMinute = hrMin(cur.start)[1]
					var startTime = checkRollover(moment.utc([year, month, day, startHour, startMinute ]), i)
					var endHour = hrMin(cur.end)[0]
					var endMinute = hrMin(cur.end)[1]
					var endTime = checkRollover(moment.utc([year, month, day, endHour, endMinute]), i)
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
					callsign : networkCallsign,
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
	    }
	});



	
})