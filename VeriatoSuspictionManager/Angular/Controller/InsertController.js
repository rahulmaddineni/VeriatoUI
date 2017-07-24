var InsertController = function ($scope, $http, $state) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

        }
        else {
            $state.go("login");
        }

    });

    $scope.dev = 'http://localhost:17433/';
    $scope.production = 'http://veriatodb.gear.host/';

    $scope.log;
    $scope.submitdata = function () {
            $http({
            method: 'POST',
            url: $scope.production + 'Api/Rest/AddLog',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                header: $scope.log.header,
                username: $scope.log.username,
                useremail: $scope.log.useremail,
                phone: $scope.log.phone,
                type: $scope.log.type,
                description: $scope.log.description
            }
        }).then(function (response) {
            $scope.sucessmsg = response;
            $state.go("home");
        });
    };
}

InsertController.$inject = ['$scope', '$http', '$state'];