(function() {
   'use strict';

   angular
   .module('DealsApp')
   .controller('CouponController', CouponController);

  function CouponController($scope, $stateParams, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.image = $stateParams.image;
  }
})();
