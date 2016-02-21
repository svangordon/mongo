angular.module('app')
	.controller('networksController', [ '$scope', 'networksFactory', 'emissionsFactory', function (scope, networks,emissions) {
		scope.networks;
		networks.allNetworks().then(function(res) {
			scope.networks = res.data
		})
		// scope.activeNetworks = networks.activeNetworks
		// scope.log = function(val) {
		// 	console.log(val)
		// }

		scope.record = function (val) {
			console.log(val)
		}

		scope.hoverStateReset = function () {
			for (network in emissions.emissionsByNetwork) {
				emissions.emissionsByNetwork[network].forEach(function(cur) {
					cur.hover = false
				})
			}
		}

		scope.activeNetworksNumber = function() {
			return 2 //one day the may or may not matter again
			return scope.networks.filter(cur => cur.active).length
		}

		scope.addNetworks = false

		scope.areInactiveNetworks = function () {
			return Boolean(scope.networks.filter(cur => !cur.active).length)
		}

	}])