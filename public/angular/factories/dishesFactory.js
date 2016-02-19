angular.module('app')
	.factory('dishesFactory', [ '$http', function (http) {

		var getDishes = function() {
			return http.get('/dishes/all').
			then(function (res) {
				return res
			})
		}

		return {
			getDishes : getDishes
		}
	}])