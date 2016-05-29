(function () {
    'use strict';

    angular
        .module('DealsApp')
        .controller('HomeController', HomeController);

    function HomeController($q, $filter, $timeout, $scope, $firebaseArray, $ionicPopup, $stateParams, $window, $ionicNavBarDelegate, $state, $localStorage) {
        $scope.searchBox = {};
        $scope.searchBox.value = false;
        console.log($stateParams);
        if ($stateParams.reload) {
            $stateParams.reload = null;
            $timeout(function () {
                $window.location.reload();
            }, 300)
        }
        $scope.tabsOn = true;
        var ref = new Firebase('https://mealsdealssteals.firebaseio.com/companies')
        $scope.data = $firebaseArray(ref);
        $localStorage.tempData = $scope.data;
        console.log($scope.data);
        function reset() {
            var deferred = $q.defer();
            var temp = new Firebase('https://mealsdealssteals.firebaseio.com/companies');
            var db = $firebaseArray(temp);
            deferred.resolve(db);
            return deferred.promise;
        }
        $scope.filterByCat = function (cat) {
            reset().then(function (data) {
                $scope.data = data;
                if (cat !== "all") {
                    $scope.data.forEach(function (item) {
                        if (item.category !== cat) {
                            $scope.data.splice($scope.data.indexOf(item), 1);
                        }
                    })
                } else {
                    var temp = new Firebase('https://mealsdealssteals.firebaseio.com/companies');
                    var db = $firebaseArray(temp);
                    $scope.data = db;
                }
            })
        }
    }
})();
