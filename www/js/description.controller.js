(function () {
  'use strict';

  angular
    .module('DealsApp')
    .controller('DescriptionController', DescriptionController);

  function DescriptionController($scope, $state, $stateParams, $firebaseObject, $firebaseArray, $localStorage) {
    var ref = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/' + $stateParams.id);
    var ref2 = new Firebase('https://mealsdealssteals.firebaseio.com/');
    var redeemed;

    $scope.coupon = $firebaseObject(ref)
    console.log($scope.coupon);
    $scope.redeem = function () {
      ref2.child('redeemed').once("value", function(snapshot) {
      redeemed = snapshot.val();
      console.log(snapshot.val())
      ref2.update({redeemed: redeemed + 1});
    });
      if ($scope.coupon.oneTime === "true") {
        $localStorage.IDs.push($scope.coupon.$id);
      }
      $state.go('coupon', {image: $scope.coupon.image})
    }
  }
})();
