(function () {
  'use strict';

  angular
    .module('DealsApp')
    .controller('DescriptionController', DescriptionController);

  function DescriptionController($scope, $state, $stateParams, $firebaseObject, $localStorage) {
    var ref = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/' + $stateParams.id);
    $scope.coupon = $firebaseObject(ref)
    $scope.redeem = function () {
      if ($scope.coupon.oneTime === "true") {
        $localStorage.IDs.push($scope.coupon.$id);
      }
      $state.go('coupon', {image: $scope.coupon.image})
    }
  }
})();
