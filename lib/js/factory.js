socialCode.factory("resource", ['$http', function($http) {
	var obj = {};
	obj.login = function(payload){
		return $http.post('/login',payload);
	 };
	 obj.register = function(payload){
		return $http.post('/register',payload);
	 }
	 return obj;
}]);
