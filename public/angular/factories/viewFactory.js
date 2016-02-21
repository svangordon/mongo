// viewFactory contains info about the view that should be passed b/w controllers,
// mostly minPerPx.  Idk if the functions for calculating width of blocks should
// go here or in the various controllers.  I mean, my thought is that it'd be
// convenient to only have to write it once.

angular.module('app')
	.factory('viewFactory', [function () {

		var minPerPx = 2

		// returns total size of block, not taking the viewport into account
		var absBlockWidth = function (start, end) {
			if(moment(end).diff(moment(start), 'm') < 0) {
				console.log(start, end)
			}

			return moment(end).diff(moment(start)) * minPerPx
		} 

		return {
			minPerPx : minPerPx,
			absBlockWidth : absBlockWidth
		}
	}])