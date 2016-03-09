angular.module('app')
	.controller('emissionsController', ['$scope', 'dayFactory', 'viewFactory', 'networkFactory', 'timeFactory', function(scope, day, view, networks, time) {
		// TODO : This getday is hardcoded, needs to be made today / based on the timefactory thing
		
		// !!!!! : Don't forget what format activeNEtworks is in.

		scope.days = []
		scope.channels = []
		// day.search('bbc1', moment.utc('2016-02-24'))
		// 	.then(function(res){
		// 		scope.channels = scope.channels.concat(res.data)
		// 	})

		// day.search('bbc2', moment.utc('2016-02-24'))
		// 	.then(function(res){
		// 		scope.channels = scope.channels.concat(res.data)
		// 		console.log('scope channels', scope.channels)
		// 	})

		scope.schedule = time.schedule



		// console.log('\ntime Factory\n', time)

		scope.colorTable = {}

		scope.log = function (val) {console.log(val)}

		scope.activeNetworks = networks.activeNetworks
		console.log('activeNetworks', scope.activeNetworks)
			
		scope.absBlockWidth = view.absBlockWidth
		scope.relBlockWidth = view.relBlockWidth
		
		// TODO: This is an abomination before god, but I need it to work right now.
		// It basically gets all of the days, sorts them by days, then puts them together,
		// then combines them again... Never, ever, do an entire front end before knowing
		// how to code the backend (obviously, that will never happen)
		day.all()
			.then(function (res) {
				scope.days = res.data;
				scope.activeNetworks.networks.forEach(function(network) {
					var emissions = scope.days.filter(function(day) { return day.callsign === network })
					scope.channels.push({callsign : network, emissions : emissions})
				})
				scope.channels.forEach(function(cur){
					cur.emissions = cur.emissions.map(cur => cur.emissions)
					cur.emissions = [].concat.apply([], cur.emissions)

					console.log('cur', cur)
				})
				console.log('new channels arr', scope.channels)
			})

		networks.all().then(function(networks) {
			networks.data.forEach(function(cur) {
				scope.colorTable[cur.callsign] = cur.color
			})
			console.log('color table : ', scope.colorTable)
		})

	}])