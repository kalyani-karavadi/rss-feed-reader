'use strict';

/**
 * @ngdoc overview
 * @name rssFeedReaderApp
 * @description
 * # rssFeedReaderApp
 *
 * Main module of the application.
 */
angular
  .module('rssFeedReaderApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl'
      // })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/', {
        templateUrl: 'views/rssFeeds.html',
        controller: 'RssFeedController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
