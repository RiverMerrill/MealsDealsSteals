(function() {
   'use strict';

   angular
   .module('DealsApp')
   .controller('SettingsController', SettingsController);

  function SettingsController($scope, $localStorage, $state) {
    $scope.logout = function(){
      $localStorage.loggedIn = false;
      $state.go('landing');
    }
  }
})();
