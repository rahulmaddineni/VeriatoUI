var App = angular.module('App', ['ngMessages', 'ui.router', 'pusher-angular', 'firebase', 'chart.js']);

App.controller('MainController', MainController);
App.controller('AuthController', AuthController);
App.controller('HomeController', HomeController);
App.controller('InsertController', InsertController);
App.controller('UpdateController', UpdateController);
App.controller('DetailsController', DetailsController);
App.controller('ChartController', ChartController);

App.service('authService', authService);


var configFunction = function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, ChartJsProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: 'Angular/Views/Login.html',
            controller: "AuthController"
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'Angular/Views/LogOut.html',
            controller: 'AuthController',
            resolve: {
                logout: function (authService) {
                    authService.logOut();
                }
            }
        })
        .state("register", {
            url: "/register",
            templateUrl: 'Angular/Views/Register.html',
            controller: "AuthController"
        })
        .state("home", {
            url: "/home",
            templateUrl: 'Angular/Views/Home.html',
            controller: "HomeController",
            //resolve: {
            //    // preventing un-authorized access
            //    isLoggedIn: function (authService) {
            //        return authService.isLoggedIn();
            //    }
            //}
        })
        .state("insert", {
            url: "/insert",
            templateUrl: 'Angular/Views/Insert.html',
            controller: "InsertController",
            
        })
        .state("update", {
            url: "/update/:id",
            templateUrl: 'Angular/Views/Update.html',
            controller: "UpdateController",
        })
        .state("details", {
            url: "/details/:id",
            templateUrl: 'Angular/Views/Details.html',
            controller: "DetailsController",
        })
        .state("analysis", {
            url: "/analysis",
            templateUrl: 'Angular/Views/Chart.html',
            controller: "ChartController",
        })
    //$locationProvider.html5Mode(true);

    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: false
    });
}
configFunction.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', 'ChartJsProvider'];

App.config(configFunction);
App.constant('firebaseUrl', "https://veriatoui.firebaseio.com/");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDY1uqRAMPe7fRwR5kIPHN4oGvci00wFPQ",
    authDomain: "veriatoui.firebaseapp.com",
    databaseURL: "https://veriatoui.firebaseio.com",
    projectId: "veriatoui",
    storageBucket: "veriatoui.appspot.com",
    messagingSenderId: "985033211614"
};
firebase.initializeApp(config);
App.constant('firebase', firebase);


//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
App.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

