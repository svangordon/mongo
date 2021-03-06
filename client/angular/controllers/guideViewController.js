angular.module('app')
	.controller('guideViewController', ['$scope', 'emissionsFactory', 'networksFactory', 'timeFactory', 'hoverFactory', function(scope, emissions, networks, time, hover) {

		scope.hours = time.hours;
		scope.schedule = time.schedule
		scope.emissions  = emissions.emissions;
		scope.networks = networks.networks;
		scope.minPerPx = time.minPerPx
		scope.hover = hover.activeCell

		// console.log(networks.networks)

		scope.log = function (val) {
		// Something is calling this in the html and I can't figure out what
			console.log(val)
		}

		scope.timeBarHeight = function () {
			// console.log('scope.networks', networks.activeNetworks.length())
			return 64 * networks.activeNetworks.length() // once this is figured out, have it return it's original value or whatever
			// TODO: I have no idea what the aboce comment means -- I suspect that this algorithim below
			// returns a bad value, or something. Or maybe something else was being tested, and this never got reverted?
			// return scope.networks.filter(cur => cur.active === true).length * 64
		}

		scope.textState = {
			val : 0,
			increment : function() {
				this.val = (this.val + 1) % 2
			}
		}

		scope.slideState = {
			val : -1,
			incrementLeft : function () {
				if (this.val > 1) {this.val = 0}
				this.val = (this.val+1) % 2
				// console.log(this.val)
			},
			incrementRight : function () {
				if (this.val < 2) {this.val = 2}
				this.val = ((this.val+1) % 2) + 2
				// console.log(this.val)
			}
		}

		scope.setSlide = function (val) {
			scope.slideDirection = val;
			// console.log(scope.slideDirection)
		}

		scope.clearSlide = function () {
			scope.slideDirection = 'null'
		}

		scope.evalSlide = function evalSlide (val) {
			return val === scope.slideDirection
		}


		// Holding on to this code until later.  May be useful?
		// // // // // // // // // // //
		// // emission.hoverHandler($event.offsetX, emission.getDisplayWidth(schedule.firstHour(), schedule.lastHour(), minPerPx))
		// scope.hoverHandler = function (offset, cellWidth) {
		// 	// console.log(offset,cellWidth)
		// 	if (offset > cellWidth) {
		// 		scope.activeCell = null;
		// 	}
		// }


	}])
