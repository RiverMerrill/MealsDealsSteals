dealsApp.controller('LandingController', function($scope, $state ,$localStorage, $ionicDeploy){
  $ionicDeploy.check().then(function(snapshotAvailable) {
    if (snapshotAvailable) {
      $ionicDeploy.download().then(function() {
        return $ionicDeploy.extract();
      });
    }
  });
  $scope.tabsOn = false;
  var ref = new Firebase('https://mealsdealssteals.firebaseio.com/')
  if(!$localStorage.IDs){
    $localStorage.IDs = [];
  }
  if(!$localStorage.favorites){
    $localStorage.favorites = [];
  }
  console.log($localStorage.userLoggedIn)
  if($localStorage.userLoggedIn){
    ref.authWithPassword({
      email: $localStorage.userLoggedIn.username,
      password: $localStorage.userLoggedIn.password
    }, function(err, authData){
        if(err){console.log(err)}
        if(authData){$state.go('home');}
    })
  }

})
