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
      ref.once("value", function(snapshot) {
      redeemed = snapshot.val().redeemed;
      if(snapshot.val().redeemed == undefined){
          ref.update({redeemed: 1});
      } else{
          ref.update({redeemed: redeemed + 1});
      }
      console.log(snapshot.val().redeemed)
    });
      if ($scope.coupon.oneTime === "true") {
        $localStorage.IDs.push($scope.coupon.$id);
      }
      $state.go('coupon', {image: $scope.coupon.image})
    }
  }
})();
