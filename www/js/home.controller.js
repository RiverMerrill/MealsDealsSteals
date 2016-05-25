(function() {
'use strict';

    angular
        .module('DealsApp')
        .controller('HomeController', HomeController);

    function HomeController($timeout, $scope, $firebaseArray, $ionicPopup, $stateParams, $window, $ionicNavBarDelegate, $state) {
        $ionicNavBarDelegate.showBackButton(false);
        console.log($stateParams);
        if($stateParams.reload){
            $stateParams.reload = null;
            $timeout(function(){
                $window.location.reload();
            }, 1000)
        }
        $scope.tabsOn = true;
        var ref = new Firebase('https://mealsdealssteals.firebaseio.com/companies')
        $scope.data = $firebaseArray(ref);
        console.log($scope.data);


        $scope.showPopup = function(item) {

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<p style="text-align: center">' + item.description + '</p>',
                title: item.title,
                subTitle: 'Expiration: ' + item.date,
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Use Offer</b>',
                        type: 'button-positive',
                        onTap: function() {
                            viewItem(item);
                        }
                    }
                ]
            });

        }
        function viewItem(item) {

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<img src="' + item.image + '" style="width: 100%"/>',
                title: item.title,
                subTitle: 'Expiration: ' + item.date,
                scope: $scope,
                buttons: [
                    { text: 'Ok',
                      type: 'button-positive' }
                ]
            });

        }
    }
})();
