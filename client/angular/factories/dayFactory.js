// This is changing from something that reads a local json file and runs a constructor
// Over a bunch of things into something that just queries a db. crazy.

angular.module('app')
	.factory('dayFactory', ['$http', function(http){

		function getDay (networkName, day) { //day should be a moment
			var networkString = 'networks=' + networkName;
			var dayString = 'day=' + day.valueOf()
			return http.get('/days/?' + networkString + '&' + dayString)
				.then(function (res) {
					return res
				})
		}

		return {
			getDay : getDay
		}
	}])