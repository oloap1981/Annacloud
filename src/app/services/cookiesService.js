angular.module("applicationModule").service("cookiesService", ["$cookies", "$window", function ($cookies, $window) {


    this.getCookie = function(key) {
        // return $cookies.getObject(key);
        var valueToReturn = JSON.parse($window.localStorage.getItem(key));
        return valueToReturn;
    };

    this.addCookie = function(key, value) {
        // $cookies.putObject(key, value);
        var valueToStore = value;
        if (valueToStore == null){
            valueToStore = "";
        } else {
            valueToStore = JSON.stringify(valueToStore);
        }
        $window.localStorage.setItem(key, valueToStore);
    };

    this.removeCookie = function(key) {
        // $cookies.remove(key);
        $window.localStorage.removeItem(key);
    };

    this.json2string = function(jsonObject) {
        return JSON.stringify(jsonObject);
    };

    this.string2json = function(stringObject) {
        return JSON.parse(stringObject);
    };

}]);

/*
$window.localStorage.setItem(key,value)
$window.localStorage.getItem(key)
$window.localStorage.removeItem(key)
*/