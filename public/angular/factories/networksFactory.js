angular.module('app')
	.factory('networksFactory', ['$http',function(http){

		function allNetworks () {
			return http.get('/networks/all')
				.then(function(res) {
					return res
				})
		}

		return {
			allNetworks : allNetworks
		}

	}])


