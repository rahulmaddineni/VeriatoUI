var UpdateController = function ($scope, $http, $state, $stateParams) {
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
    $scope.sucessmsg;

    getData = function () {
        $http({
            method: 'GET',
            url: $scope.production + 'Api/Rest/GetLogByID' + '?id=' + $stateParams.id,
        })
            .then(function (response) {
                $scope.log = response.data;
                $scope.log.phone = +$scope.log.phone;  //parsing to int
            });
    };

    getData();

    $scope.submitdata = function () {
        $http({
            method: 'POST',
            url: $scope.production + 'Api/Rest/UpdateLog',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                logId: $scope.log.logId,
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

UpdateController.$inject = ['$scope', '$http', '$state', '$stateParams'];