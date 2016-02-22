// viewFactory contains info about the view that should be passed b/w controllers,
// mostly minPerPx.  Idk if the functions for calculating width of blocks should
// go here or in the various controllers.  I mean, my thought is that it'd be
// convenient to only have to write it once.

angular.module('app')
	.factory('viewFactory', ['timeFactory', function (time) {
		var viewStart = time.schedule.firstHour();
		var viewEnd = time.schedule.lastHour();
		console.log

		var minPerPx = 2

		// returns total size of block, not taking the viewport into account
		var absBlockWidth = function (start, end) {
			return moment(end).diff(moment(start), 'm') * minPerPx
		}

		var relBlockWidth = function (progStart, progEnd) {
			// console.log(moment(progStart).format(), moment(progEnd).format())
			var start = Math.max(progStart, time.schedule.firstHour().valueOf()),
				end = Math.min(moment.utc(progEnd), time.schedule.lastHour().valueOf());
			// console.log('from block width: ', moment(start).format(),moment(end).format())
			// console.log('progEnd', moment(progEnd).format(), '\nviewEnd', time.schedule.lastHour().format(), 
				// '\nselected', moment(Math.min(progEnd, time.schedule.lastHour().valueOf())).format())
			// console.log(moment(end).diff(moment(start), 'minutes') * minPerPx)
			console.log( moment(end).diff(moment(start), 'minutes') * minPerPx)
			return moment(end).diff(moment(start), 'minutes') * minPerPx
		}

		return {
			minPerPx : minPerPx,
			absBlockWidth : absBlockWidth,
			relBlockWidth : relBlockWidth
		}
	}])