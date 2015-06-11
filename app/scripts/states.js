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

                templateUrl: 'templates/pages/home.html',

                resolve: {

                    assets: function (Preloader) {
                        
                        return Preloader.getAssets('app.home');

                    }

                }

            })

            .state('app.homeWithPath', {

                url: '/home',

                templateUrl: 'templates/pages/home.html',

                resolve: {

                    assets: function (Preloader) {
                        
                        return Preloader.getAssets('app.home');

                    }

                }

            })

            .state('app.about', {

                url: '/about',

                templateUrl: 'templates/pages/about-me.html',

                resolve: {

                    assets: function (Preloader) {
                        
                        return Preloader.getAssets('app.about');

                    }

                }

            })

            .state('app.portfolio', {

                url: '/portfolio',

                templateUrl: 'templates/pages/portfolio.html',

                resolve: {

                    assets: function (Preloader) {
                        
                        return Preloader.getAssets('app.portfolio');

                    }

                }

            })

            .state('app.clients', {

                url: '/clients',

                templateUrl: 'templates/pages/clients.html',

                resolve: {

                    assets: function (Preloader) {
                        
                        return Preloader.getAssets('app.clients');

                    }

                }

            })

            .state('app.contact', {

                url: '/contact',

                templateUrl: 'templates/pages/contact-me.html',

                resolve: {

                    assets: function (Preloader) {
                        
                        return Preloader.getAssets('app.contact');

                    }

                }

            });

        $urlMatcherFactoryProvider.strictMode(false);

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/');

    });
