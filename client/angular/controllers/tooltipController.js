angular.module('app')
	.controller('tooltipController', ['$scope', 'hoverFactory', 'viewFactory', function (scope, hover, view) {
		var activeElement = $('div.active-cell')
		scope.hover = hover.activeCell;
		scope.verticalOffset = 100;
		scope.horizontalOffset = 0;
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
			// console.log($( 'div.active-cell emission-block-content' ))
		}

		scope.getTop = function () {

			// console.log($( 'div.active-cell' ).length !== 0 ?
			// 	$( 'div.active-cell' ).position().top : 0)
			// console.log($( 'div.active-cell' ))
			if ($( 'div.active-cell' ).length !== 0) {
				scope.tooltipTop = Math.ceil($( 'div.active-cell' ).parent().parent().position().top + scope.verticalOffset)
				// console.log(scope.tooltipTop)
			} else {
				// console.log('active-cell is undefined')
			}
			// console.log('tooltipTop returns', scope.tooltipTop)
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
			var cellWidth = view.relBlockWidth(scope.hover.activeCell.start, scope.hover.activeCell.end)
			// console.log('offsetX', offsetX, 'cellWidth', cellWidth)
			if (offsetX >= cellWidth) {
				scope.hover.resetActive()
			}
		}

	}])
