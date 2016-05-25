dealsApp.controller('LandingController', function($scope, $state ,$localStorage){
  $scope.tabsOn = false;
  if(!$localStorage.IDs){
    $localStorage.IDs = [];
  }
  if(!$localStorage.favorites){
    $localStorage.favorites = [];
  }
  if($localStorage.loggedIn === true){
    $state.go('home');
  }

})
