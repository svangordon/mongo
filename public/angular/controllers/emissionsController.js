angular.module('app')
	.controller('emissionsController', ['$scope', 'dayFactory', 'viewFactory', function(scope, day, view) {
		day.getDay('bbc1', '2016-02-18')
			.then(function(res){
				//TODO : hunt down and remove dupes from collection results, so that the 0-index is unnecessary
				scope.channels = res.data
				console.log(scope.channels)
				// TODO on monday : figure out how, exactly, the different repeats are supposed to interlock
			})

		scope.absBlockWidth = view.absBlockWidth

	}])