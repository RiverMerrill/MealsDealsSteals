// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var dealsApp = angular.module('DealsApp', ['ionic', 'firebase', 'ngStorage', 'ngCordova', 'ionic.cloud'])

    .config(function($ionicCloudProvider) {
      $ionicCloudProvider.init({
        "core": {
          "app_id": "f6d868cf"
        }
      });
    })
    .run(function($ionicPlatform, $ionicDeploy) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/landing");
        //
        // Now set up the states
        $stateProvider
            .state('landing', {
                url: "/landing",
                templateUrl: "templates/landing.html",
                controller: 'LandingController'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "templates/signup.html",
                controller: "SignupController"
            })
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "LoginController"
            })
            .state('home', {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: "HomeController",
                params: {reload: null}
            })
            .state('coupons', {
                url: "/coupons/:id/:title/:location/:address",
                templateUrl: "templates/coupons.html",
                controller: "CouponsController",
                params: {image: null, description: null}
            })
            .state('description', {
                url: "/description",
                templateUrl: "templates/coupon-description.html",
                controller: "DescriptionController",
                params: {id: null}
            })
            .state('coupon', {
                url: "/coupon",
                templateUrl: "templates/coupon.html",
                controller: "CouponController",
                params: {image: null}
            })
            .state('favorites', {
                url: "/favorites",
                templateUrl: "templates/favorites.html",
                controller: "FavoritesController",
                params: {image: null}
            })
            .state('settings', {
                url: "/settings",
                templateUrl: "templates/settings.html",
                controller: "SettingsController",
                params: {image: null}
            })
    })
