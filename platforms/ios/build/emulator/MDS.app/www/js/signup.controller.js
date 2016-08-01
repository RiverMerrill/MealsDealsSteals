dealsApp.controller('SignupController', function($scope, $state, $localStorage){
  $scope.tabsOn = false;
  $scope.newUser = {};
  var ref = new Firebase('https://mealsdealssteals.firebaseio.com/');

  $scope.passwordMatch = function(){
    if($scope.newUser.pass !== $scope.newUser.confirmPass){
      $scope.message = "Passwords do not match";
    } else{
      $scope.message = undefined;
    }
  }
  $scope.signup = function(){
    console.log($scope.newUser);
    if($scope.newUser.pass === $scope.newUser.confirmPass){
      ref.createUser({
        email: $scope.newUser.email,
        password: $scope.newUser.pass
      }, function(err, userData){
        if(err){
          console.log(err)
          $scope.message = err;
        }
        if(userData){
          console.log(userData);
          ref.authWithPassword({
            email: $scope.newUser.email,
            password: $scope.newUser.pass
          }, function(err, authData){
            if(err){console.log(err)};
            if(authData){$state.go('home'); $localStorage.loggedIn = true};
          })
        }
      })
    }
  }
})
