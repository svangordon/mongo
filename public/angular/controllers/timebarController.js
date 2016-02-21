angular.module('app')
	.controller('timeBarController', ['$scope', 'timeFactory', function(scope, time) {
		scope.schedule = time.schedule;
		scope.minPerPx = time.minPerPx

	}])