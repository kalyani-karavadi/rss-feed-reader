angular.module('rssFeedReaderApp')
  .factory('rssFeedService', ['$http', function ($http) {
    'use strict';
    var googleFeedAPI = 'http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK';
    return {
        getFeeds: function (config) {
            return $http.jsonp(googleFeedAPI, config);
        }
    };
}]);
