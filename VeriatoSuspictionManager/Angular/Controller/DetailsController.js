var DetailsController = function ($scope, $http, $stateParams, $state) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

        }
        else {
            $state.go("login");
        }

    });

    $scope.dev = 'http://localhost:17433/';
    $scope.production = 'http://veriatodb.gear.host/';

    getData = function () {
        $http({
            method: 'GET',
            url: $scope.production+'Api/Rest/GetLogByID'+'?id='+$stateParams.id,
        })
            .then(function (response) {
                $scope.result = response.data;
            });
    };

    getData();

    $scope.deleteLog = function (id) {
        $http({
            method: 'GET',
            url: $scope.production+'Api/Rest/DeleteLogByID' + '?id=' + id,
        })
            .then(function (response) {
                $state.go("home");
            });
    };
}

DetailsController.$inject = ['$scope', '$http', '$stateParams', '$state'];