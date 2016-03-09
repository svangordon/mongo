angular.module('app')
	.controller('networksController', [ '$scope', 'networkFactory', 'emissionsFactory', function (scope, networks,emissions) {
		scope.networks;
		networks.all().then(function(res) {
			scope.networks = res.data
			console.log(scope.networks)
		})

		scope.activeNetworks = networks.activeNetworks

		scope.removeNetwork = function(callsign) {
			networks.activeNetworks.remove(callsign);
		}

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

		scope.getAttr = function (callsign, attr) {
			// console.log('getAttr', scope.networks.filter(cur => callsign === cur.callsign)[0].logo)

			return scope.networks.filter(cur => callsign === cur.callsign)[0][attr]
		}

		// scope.getColor = function (callsign)

		console.log('activeNetworks', scope.activeNetworks)
	}])