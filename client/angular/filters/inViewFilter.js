angular.module('app')
	.filter('inViewFilter', function () {
		return function (emissions, schedule) {
			var out = [];
			// console.log(emissions, schedule)
			var schedStart = moment(schedule.firstHour())
			var schedEnd = moment(schedule.lastHour());
			// emissions.forEach(function (cur) {console.log(moment(cur.end).format())})
			return emissions.filter(function(cur) { return moment(cur.start).isBefore(schedEnd)
														&& moment(cur.end).isAfter(schedStart) })
			// return out
		}
	})