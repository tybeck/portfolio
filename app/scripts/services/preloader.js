'use strict';

angular.module('tyb')
	
	.factory('Preloader', function ($q, PRELOAD_ASSETS) {

		return({

			'assetsLoaded': {},

			getAssets: function (routeName) {

				var d = $q.defer(),

					self = this;

				if(PRELOAD_ASSETS[routeName]) {

					var assets = PRELOAD_ASSETS[routeName],

						loaded = 0,

						nextLoaded = function () {

							loaded ++;

							if(loaded === assets.length) {

								d.resolve();

							}

						};

					angular.forEach(assets, function (asset) {

						if(!self.assetsLoaded[asset]) {

							var img = document.createElement('img');

							angular.extend(img, {

								'src': asset,

								onload: function() {
								
									self.assetsLoaded[asset] = true;

									nextLoaded();

								}

							});

						} else {

							nextLoaded();

						}

					});

				} else {

					d.resolve();

				}

				return d.promise;

			}

		});

	});