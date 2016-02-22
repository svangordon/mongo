angular.module('app')
	.factory('networksFactory', ['$http',function(http){

		function allNetworks () {
			return http.get('/networks/all')
				.then(function(res) {
					return res
				})
		}

		function network (networkName) {
			return http.get('networks/' + networkName)
				.then( function (res) {
					return res
				}) 
		}

		function colorTable (networkName) {
			return allNetworks().then( function (res) {
				var out = {};
				res.data.forEach(function (cur) {
					out[cur.callsign] = cur.color
				})
				return out
			})
		}

		return {
			allNetworks : allNetworks,
			network : network,
			colorTable : colorTable
		}

	}])


