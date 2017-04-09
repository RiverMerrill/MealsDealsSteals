(function () {
  'use strict';

  angular
    .module('DealsApp')
    .controller('DescriptionController', DescriptionController);

  function DescriptionController($scope, $state, $stateParams, $firebaseObject, $firebaseArray, $localStorage) {
    var ref = new Firebase('https://mealsdealssteals.firebaseio.com/coupons/' + $stateParams.id);
    var redeemed;
    var d = new Date();
    var m = d.getMonth();
    var ref2 = new Firebase('https://mealsdealssteals.firebaseio.com/');
    $scope.coupon = $firebaseObject(ref)
    console.log($scope.coupon);
    $scope.redeem = function () {
      ref.once('value', function(snapshot) {
      if(snapshot.val().redeemed == undefined){
          ref.update({redeemed: 1});
      } else{
          redeemed = snapshot.val().redeemed;
          ref.update({redeemed: redeemed + 1});
      }
        console.log(snapshot.val().redeemed)
      });
      if ($scope.coupon.oneTime === "true") {
        $localStorage.IDs.push($scope.coupon.$id);
      }
      ref2.once('value').then(function(snapshot){
        if(!snapshot.val()[m]){
          debugger;
          var updates = {};
          updates[$scope.coupon.title] = 1;
          firebase.database().ref(m).set({})
          firebase.database().ref(m + '/' + $scope.coupon.company).set({})
          firebase.database().ref(m + '/' + $scope.coupon.company).set(updates);
        } else if (!snapshot.val()[m][$scope.coupon.company]){
          debugger;
          var updates = {};
          updates[$scope.coupon.title] = 1;
          firebase.database().ref(m + '/' + $scope.coupon.company).set(updates);
        } else if (!snapshot.val()[m][$scope.coupon.company][$scope.coupon.title]){
          debugger;
          var updates = {}
          updates[$scope.coupon.title] = 1;
          firebase.database().ref(m + '/' + $scope.coupon.company).update(updates)
        } else {
          debugger;
          var redeemed = snapshot.val()[m][$scope.coupon.company][$scope.coupon.title] + 1;
          var updates = {};
          updates[$scope.coupon.title] = redeemed;
          firebase.database().ref(m + '/' + $scope.coupon.company).update(updates)
        }
      })
      $state.go('coupon', {image: $scope.coupon.image})
    }
  }
})();
