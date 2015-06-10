'use strict';

var factory = null;

angular.module('tyb')
	
	.factory('PageTitleTag', function ($rootScope, $timeout) {

		return function () {

			if(!factory) {

				$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

				    if(toState && toState.name) {

				        return factory.setTitle(toState, toParams);

				    }

				    return factory.setTitle();

				});

				factory = {

					title: 'Tyler+Beck - Home',

					prefix: 'Tyler+Beck - ',

					setTitle: function (state) {

						var title = 'Home',

							self = this;

						switch(state.name) {

							case 'app.homeWithPath':
							case 'app.home':

								title = 'Home';

							break;

							case 'app.about':

								title = 'About';

							break;
							case 'app.portfolio':

								title = 'Portfolio';

							break;
							case 'app.clients':

								title = 'Clients';

							break;
							case 'app.contact':

								title = 'Contact';

							break;

						}

						$timeout(function () {

							self.title = self.prefix + title;

						});

					}

				};

			}

			return factory;

		};

	});