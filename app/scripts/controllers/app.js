'use strict';

/**
 * @ngdoc function
 * @name tyb.controller:AppCtrl
 * @description
 * # AppCtrl
 * Main controller for our application
 */

angular.module('tyb')

    .controller('AppCtrl', function ($scope, $timeout, PageTitleTag) {

    	var getMainElement = function () {

    		return angular.element(document.getElementById('main'));

    	};

    	$scope.$on('tyb.resize', function (ev, size) {

    		var main = getMainElement();

    		main.css('height', size.h + 'px');

    	});

    	angular.element(document).ready(function () {

			$scope.$on('$stateChangeSuccess', function () {

				$timeout(function () {

					var main = getMainElement();

					if(main && main.scrollTop) {

						main.scrollTop(0, 250);

					}

				}, 50);

			});

    	});

        $scope.pageTitleTag = new PageTitleTag();
    	
    });