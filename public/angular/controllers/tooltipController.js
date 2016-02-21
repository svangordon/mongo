angular.module('app')
	.controller('tooltipController', ['$scope', 'hoverFactory', function (scope, hover) {
		var activeElement = $('div.active-cell')
		scope.hover = hover.activeCell;
		scope.verticalOffset = 100;
		scope.horizontalOffset = 97.5;
		scope.tooltipTop = 0;
		scope.tooltipLeft = 0;

		scope.log = function (val) {
			console.log(val)
		}

		scope.isActiveCell = function () {
			// console.log(angular.element(document.querySelector('.active-cell')).prop('offsetLeft'))
			return scope.hover.activeCell !== null
		}

		scope.logActiveOnExit = function () {
			console.log($( 'div.active-cell emission-block-content' ))
		}

		scope.getTop = function () {
			// console.log($( 'div.active-cell' ).length !== 0 ?
			// 	$( 'div.active-cell' ).position().top : 0)
			// console.log($( 'div.active-cell' ))
			if ($( 'div.active-cell' ).length !== 0) {
				scope.tooltipTop = Math.ceil($( 'div.active-cell' ).position().top + scope.verticalOffset)
			} else {
				// console.log('active-cell is undefined')
			}
			return scope.tooltipTop
		}

		scope.getLeft = function () {
			// console.log($( 'div.active-cell' ).length !== 0 ?
			// 	$( 'div.active-cell' ).position().left : 0)
			if ($( 'div.active-cell' ).length !== 0) {
				scope.tooltipLeft = Math.ceil($( 'div.active-cell' ).position().left + scope.horizontalOffset)
			}
			return scope.tooltipLeft
		}

		scope.hoverHandler = function (offsetX) {
			var cellWidth = scope.hover.activeCell.getDisplayWidth()
			if (offsetX >= cellWidth) {
				scope.hover.resetActive()
			}
		}

	}])