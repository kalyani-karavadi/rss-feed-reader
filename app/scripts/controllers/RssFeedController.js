'use strict';

/**
 * @ngdoc function
 * @name rssFeedReaderApp.controller:RssFeedController
 * @description
 * # RssFeedController
 * Controller of the rssFeedReaderApp
 */
angular.module('rssFeedReaderApp')
  .controller('RssFeedController', ['$scope', 'rssFeedService', 'localStorageService' , function ($scope, rssFeedService, localStorageService) {
		//default the url and title to some value to always get the feeds on page load/refresh for this url
		$scope.rssInput = {
			rssTitle: '',
			rssURL: ''
		};
		$scope.feed = null;
		$scope.error = null;
		var convertFeedObjToString = '';

		$scope.init = function(){
			$scope.rssInput.rssTitle = 'Frienstr';
			$scope.rssInput.rssURL = 'https://www.pinterest.com/azero0/feed.rss';
			//$scope.getRSSFeeds();
		};

		$scope.getRSSFeeds = function() {
			var config = {
				params: {
					'v': '1.0',
					'num': 50,
					'q': $scope.rssInput.rssURL,
					'p': $scope.rssInput.rssTitle
				}
			};
			//call the service to get the rss feeds for the given url
			rssFeedService.getFeeds(config)
				.success(function(data) {
					if (data.responseData && data.responseData.feed) {
						$scope.feed = data.responseData.feed;
						convertFeedObjToString = JSON.stringify($scope.feed);
						localStorageService.add('rssFeed', convertFeedObjToString);
					}
					else {
						if (data.responseDetails) {
							$scope.error = data.responseDetails;
						}
						else {
							$scope.error = 'Error getting RSS Feeds.';
						}
					}
				})
				.error(function(data) {
					console.error('RssFeedController::getRSSFeeds error:', data);
					$scope.error = 'Error getting RSS Feeds.';
				});
		};

		//clear the input fields and the feed retrieved from url.
		$scope.clearRssFeeds = function(){
			$scope.feed = '';
			$scope.rssInput.rssTitle = '';
			$scope.rssInput.rssURL = '';
		};

		//get the feed that was stored in the localstorage and set it to the scope variable
		$scope.getFeedsFromLocalStorage = function(){
			var localStorageFeeds = localStorageService.get('rssFeed');
			var parsedStorageFeed = JSON.parse(localStorageFeeds);
			console.log('RssFeedController::$scope.getFeedsFromLocalStorage  - localStorageFeeds', localStorageFeeds);
			console.log('RssFeedController::$scope.getFeedsFromLocalStorage  - parsedStorageFeed', parsedStorageFeed);
			$scope.feed = parsedStorageFeed;
		};

		$scope.init();

	}]);
