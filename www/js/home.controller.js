(function () {
    'use strict';

    angular
        .module('DealsApp')
        .controller('HomeController', HomeController);

    function HomeController($q, $cordovaGeolocation, $filter, $timeout, $scope, $firebaseArray, $ionicPopup, $stateParams, $window, $ionicNavBarDelegate, $state, $localStorage) {
        $scope.searchBox = {};
        $scope.searchBox.value = false;
        console.log($stateParams);
        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }
        if ($stateParams.reload) {
            $stateParams.reload = null;
            $timeout(function () {
                $window.location.reload();
            }, 300)
        }
        $scope.tabsOn = true;
        var ref = new Firebase('https://mealsdealssteals.firebaseio.com/companies1')
        $scope.data = $firebaseArray(ref);
        // $localStorage.tempData = $scope.data;
        function reset() {
            var deferred = $q.defer();
            var temp = new Firebase('https://mealsdealssteals.firebaseio.com/companies1');
            var db = $firebaseArray(temp);
            deferred.resolve(db);
            return deferred.promise;
        }
        $scope.filterByCat = function (cat) {
            reset().then(function (data) {
                $scope.data = data;
                if (cat == "all") {
                    var temp = new Firebase('https://mealsdealssteals.firebaseio.com/companies1');
                    var db = $firebaseArray(temp);
                    $scope.data = db;
                } else {
                    $scope.data.forEach(function (item) {
                        if (item.category != cat) {
                            $scope.data.splice($scope.data.indexOf(item), 1);
                        }
                    })
                }
            })
        }
        var chunkedData;
        $scope.data.$loaded().then(function() {
            var pos = {};
            $cordovaGeolocation
            .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
            .then(function (position) {
              pos.lat  = position.coords.latitude
              pos.lng = position.coords.longitude
            $scope.data.forEach(function(item){
                if(item.locations){
                    var distArr = [];
                    var origin = new google.maps.LatLng(pos.lat, pos.lng);
                    item.locations.forEach(function(location){
                        var dest = new google.maps.LatLng(location.lat, location.lng);
                        var dist = google.maps.geometry.spherical.computeDistanceBetween(origin, dest)*0.000621371192;
                        if(!item.distance || dist < item.distance){
                            item.distance = dist.toFixed(1);
                            item.address = location.address;
                        }
                    })
                }
            })
            }, function(err) {
            });

            
        });
    }
})();