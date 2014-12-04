var feedApp = angular.module('feedApp',[]);

feedApp.factory("feedFac", ['$http',function($http){
	var obj = {};
	
	obj.fetchUserDetails = function(){
		return $http.get('/fetch_user_information?email=shahid@codeforgeek.com').then(function(response){ /*Hey shahid please add the ejs variable over here.*/
			return response.data.user_id;
		});
	}
	
	obj.getFeeds = function(id){
		return $http.get('/get_feed?user_id='+id).then(function(response){
			return response.data;
		});
	}
	
	return obj;

}]);


feedApp.controller('feedCtrl',function($scope,feedFac){
	var feeds = this;
	var email="<%= email %>"; 
console.log(email);	
	feedFac.fetchUserDetails().then(function(data){
		$scope.user_id = data;
		feedFac.getFeeds($scope.user_id).then(function(data){
			feeds.usersFeed = data;
		});
	});

});

feedApp.directive('singlePost',function(){
	return {
		restrict:'E',
		link:function(attrs,elem,scope){
		
		},
		template:'<div class="list-group">'
				+'<a href="#" class="list-group-item active">{{$index}}</a>'
				+'<a href="#" class="list-group-item">{{feed.user_id}}</a>'
				+'<a href="#" class="list-group-item">{{feed.status_id}}</a>'
				+'<a href="#" class="list-group-item">{{feed.status_text}}</a>'
				+'<a href="#" class="list-group-item">{{feed.privacy}}</a>'
				+'<a href="#" class="list-group-item">{{feed.timestamp}}</a>'
				+'</div>'
	}
});