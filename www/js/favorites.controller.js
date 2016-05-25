(function() {
  'use strict';

  angular
  .module('DealsApp')
  .controller('FavoritesController', FavoritesController);

  function FavoritesController($scope, $firebaseObject, $ionicNavBarDelegate, $localStorage) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.data = [];
    $localStorage.favorites.forEach(function(fave){
      var ref = new Firebase('https://mealsdealssteals.firebaseio.com/companies/' + fave)
      $scope.data.push($firebaseObject(ref));
    })
  }
})();
