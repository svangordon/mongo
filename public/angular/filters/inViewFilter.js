angular.module('app')
	.filter('inViewFilter', function () {
		return function (emissions, schedule) {
			var out = [];
			var schedEnd = moment(schedule.lastHour());
			// schedEnd.add(1,'h')
			return emissions.filter(function(cur) { return cur.start.isBefore(schedEnd) && cur.end.isAfter(schedule.firstHour()) })
			// return out
		}
	})