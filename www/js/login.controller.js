dealsApp.controller('LoginController', function($scope, $state, $localStorage){
  $scope.tabsOn = false;
  $scope.user = {};
  var ref = new Firebase('https://mealsdealssteals.firebaseio.com/')
  $scope.login = function(){
    console.log($scope.user);
    ref.authWithPassword({
      email: $scope.user.email,
      password: $scope.user.pass
    }, function(err, authData){
      if(err){
        console.log(err);
        $scope.message = 'Username and password do not match';
        $scope.$apply();
      };
      if(authData){$state.go('home'); $localStorage.userLoggedIn = {username: $scope.user.email, password: $scope.user.pass}};
    })
  }

})
