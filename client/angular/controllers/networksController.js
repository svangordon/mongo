angular.module('app')
	.controller('networksController', [ '$scope', 'networksFactory', 'emissionsFactory', function (scope, networks,emissions) {
		scope.networks;
		networks.allNetworks().then(function(res) {
			scope.networks = res.data
			// console.log(scope.networks)
		})

		scope.activeNetworks = networks.activeNetworks

		scope.hoverStateReset = function () {
			for (network in emissions.emissionsByNetwork) {
				emissions.emissionsByNetwork[network].forEach(function(cur) {
					cur.hover = false
				})
			}
		}

		scope.activeNetworksNumber = function() {
			return scope.activeNetworks.networks.length
		}

		scope.addNetworks = false

		scope.areInactiveNetworks = function () {
			return Boolean(scope.networks.filter(cur => !cur.active).length)
		}

		function ActiveNetworks (arr) {
			this.networks = arr;
			this.remove = function(callsign) { this.networks.splice( this.networks.indexOf(callsign) , 1)};
			this.add = function(callsign) {this.networks.push(callsign)};
			this.isActive = (function(network) {return this.networks.indexOf(network.callsign) !== -1 }).bind(this);
			this.isInactive = (function(network) {return !this.isActive(network)} ).bind(this)
		}
		var activeNetworks = new ActiveNetworks(['bbc1', 'bbc2']);

	}])