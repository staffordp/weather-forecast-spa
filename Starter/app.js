//MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES

weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

//SERVICES

weatherApp.service('cityService', function() {
    
    this.city = "New York, NY";

                
});

//CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })

    

    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 2;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=bd44f6dd54a77de0c745f29c4f580df7", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
    };


}]);

//LISTENERS

//window.addEventListener('hashchange', function () {
//    if (window.location.hash === "#/forecast/2") {
//        
//    }
//    
//    if (window.location.hash === "#/forecast/5") {
//        
//    }
//    
//    if (window.location.hash === "#/forecast/7") {
//        
//    }
//})


