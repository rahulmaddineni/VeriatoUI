var MainController = function ($scope, firebase) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.email = user.email;
        }
    });
}

MainController.$inject = ['$scope', 'firebase'];