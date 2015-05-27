'use strict';

angular.module('tyb')

    .config(function ($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

        $stateProvider

            .state('app', {

                abstract: true,

                templateUrl: 'templates/app.html',

                controller: 'AppCtrl'

            })

            .state('app.home', {

                url: '/',

                templateUrl: 'templates/pages/home.html'

            })

            .state('app.homeWithPath', {

                url: '/home',

                templateUrl: 'templates/pages/home.html'

            })

            .state('app.about', {

                url: '/about',

                templateUrl: 'templates/pages/about-me.html'

            })

            .state('app.portfolio', {

                url: '/portfolio',

                templateUrl: 'templates/pages/portfolio.html'

            })

            .state('app.clients', {

                url: '/clients',

                templateUrl: 'templates/pages/clients.html'

            })

            .state('app.contact', {

                url: '/contact',

                templateUrl: 'templates/pages/contact-me.html'

            });

        $urlMatcherFactoryProvider.strictMode(false);

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/');

    });
