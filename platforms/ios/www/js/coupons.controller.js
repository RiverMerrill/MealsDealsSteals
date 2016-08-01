(function() {
  'use strict';

  angular
  .module('DealsApp')
  .controller('CouponsController', CouponsController);

  function CouponsController($scope, $firebaseArray, $firebaseObject, $state, $stateParams, $localStorage, $ionicNavBarDelegate){
    $scope.coupons = [];
    $scope.vars = {};
    $scope.vars.loading = true;
    $scope.vars.noCoupons = false;
    console.log('reload');
    $scope.loading = true;
    $ionicNavBarDelegate.showBackButton(true);
    $scope.tabsOn = true;
    $scope.company = $stateParams;
    console.log($scope.company);
    $localStorage.favorites.forEach(function(fave){
      if(fave == $scope.company.id){
        $scope.favorited = true;
        return;
      } else{
        $scope.favorited = false;
      }
    })
    $scope.unfavorite = function(fave){
      $localStorage.favorites.splice($localStorage.favorites.indexOf(fave), 1)
      $scope.favorited = false;
    }
    $scope.favorite = function(fave){
      $localStorage.favorites.push(fave);
      $scope.favorited = true;
    }
    var ref = new Firebase('https://mealsdealssteals.firebaseio.com/coupons')
    ref.off("child_added");
    ref.orderByChild("company").equalTo($scope.company.title).on("child_added", function(snapshot) {
      console.log(snapshot.val());
      var count = 0;
      var myId = snapshot.key();
      $localStorage.IDs.forEach(function(id){
        if(id === myId){
          count = 1;
        }
      })
      if(count === 0 && !snapshot.val().skip){
        var temp = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/' + snapshot.key())
        $scope.coupons.push($firebaseObject(temp));
      }
      if($scope.coupons.length > 0){
        $scope.vars.noCoupons = false;
      } else{
        $scope.vars.noCoupons = true;
      }
      $scope.vars.loading = false;
      $scope.$apply();
    });
  }
})();
