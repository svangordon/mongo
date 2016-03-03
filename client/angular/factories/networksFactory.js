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


		function ActiveNetworks (arr) {
			this.networks = arr;
			this.remove = function(callsign) { this.networks.splice( this.networks.indexOf(callsign) , 1)};
			this.add = function(callsign) {this.networks.push(callsign)};
			this.isActive = (function(network) {return this.networks.indexOf(network.callsign) !== -1 }).bind(this);
			this.isInactive = (function(network) {return !this.isActive(network)} ).bind(this)
		}



		var activeNetworks = new ActiveNetworks(['bbc1', 'bbc2']);

		return {
			allNetworks : allNetworks,
			network : network,
			colorTable : colorTable,
			activeNetworks : activeNetworks
		}

	}])


