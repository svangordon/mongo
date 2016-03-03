// This is changing from something that reads a local json file and runs a constructor
// Over a bunch of things into something that just queries a db. crazy.

angular.module('app')
	.factory('emissionsFactory', ['$http', function(http){

		function networkDay (networkName, day) { //day should be a moment
			var networkString = 'network=' + networkName;
			var dayString = 'day=' + day.valueOf()
			return http.get('/networks/?' + networkString + dayString)
				.then(function (res) {
					return res
				})
		}

		return {
			networkDay : networkDay
		}
	}])