// jrobie specifically pulls xml from bleb. other services will handle other websites

// =====================
// Requires
// =====================
var request = require('request')
var xml2js = require('xml2js')
var fs = require('fs')
var util = require('util')
var moment = require('moment')
var CronJob = require('cron').CronJob
var mongoose = require('mongoose')
var networks = require('../data/networks.json')
var db = require('../models.js')
var getFile = require('../utilities/getBlebFile.js')

// =====================
// Connect to Mongoose
// =====================
mongoose.connect('mongodb://localhost/guignol')

// Once verything works, put everything in the callback
var blebJob = new CronJob('00 30 00 * * *', function () {

})

// timeoutTest()

// eg ('http://bleb.org/tv/data/listings/', '/', '.xml')
function PullUrl (url1, url2, url3, start, end) {
	this.url1 = url1
	this.url2 = url2
	this.url3 = url3
	this.start = start
	this.end = end
	// eg ({start : -1, end : 6}, 'bbc1')
	this.urlArr = function (callsign) {
		var out = []
		for (var i = this.start; i <= this.end; i++) {
			out.push(this.url1 + i + this.url2 + callsign + this.url3)
		}
		return out
	}
}
var blebUrl = new PullUrl('http://bleb.org/tv/data/listings/', '/', '.xml', -1, 6)

var networkCallsigns = networks.map(cur => cur.callsign)
var pullUrls = [];
// console.log('callsigns',networkCallsigns, 'typeof', Array.isArray(networkCallsigns))
networkCallsigns.forEach(function (cur) {
	pullUrls = pullUrls.concat(blebUrl.urlArr(cur));
})
// console.log('pullUrls', pullUrls)
function structuredPull (urls) {
	console.log('begining pull');
	var i = 0;
	var l = urls.length

	var interval = setInterval(function() {
	  console.log('saving', urls[i], '\n');
	  getFile(urls[i])
	  i++;
	  if (i > l) {
		clearInterval(interval);
		console.log('interval ended')
	  }
	}, 10000);	
}
structuredPull(pullUrls);


	



// console.log('networkCallsigns \n', networkCallsigns, '\nbbcurls\n', bbcUrls)
// getFile('http://bleb.org/tv/data/listings/0/bbc1.xml')