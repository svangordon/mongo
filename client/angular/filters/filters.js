angular.module('app')
	.filter('inViewFilter', function () {
		return function (emissions, schedule) {
			var out = [];
			// console.log('inview in',emissions, schedule)
			var schedStart = moment(schedule.firstHour())
			var schedEnd = moment(schedule.lastHour());
			// emissions.forEach(function (cur) {console.log(moment(cur.end).format())})
			return emissions.filter(function(cur) { if(cur === undefined){console.log('cur undefined, cur:', cur)};return moment(cur.start).isBefore(schedEnd)
														&& moment(cur.end).isAfter(schedStart) })
			// return out
		}
	})
	.filter('daysInView', function () {
		return function (daysObjArr, schedDaysArr) {
			var out = [];
			var daysStart = schedDaysArr[0].valueOf();
			var daysEnd = schedDaysArr[schedDaysArr.length-1].valueOf();
			// console.log('daysInView inputs', daysObjArr, daysStart, daysEnd)
			// console.log('last val', schedDaysArr[schedDaysArr.length-1].valueOf() <= daysEnd)
			
			out = daysObjArr.filter(function (cur) {
				// console.log('dayval' , cur.date, 'startVal', daysStart, 'endVal', daysEnd, 'evaluates', cur.date >= daysStart && cur.date <= daysEnd)
				return cur.date >= daysStart && cur.date <= daysEnd
			})
			console.log('days out', out)
		}
	})