acquisitionApp.factory('acquiFactory', function($http) {
    return {
        get : function() {
            return $http.get(acquiURL);
        }
    }
});