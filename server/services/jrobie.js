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

// =====================
// Connect to Mongoose
// =====================
mongoose.connect('mongodb://localhost/guignol')


var BlebJob = 