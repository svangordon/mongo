angular.module('app')
	.controller('dishesController', ['$scope', '$http', 'dishesFactory', function (scope, http, dishes) {

		dishes.getDishes().then(function(data) {
			scope.dishes = data.data.dishes
		})

	}])