var ChartController = function ($scope, $http, $state) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

        }
        else {
            $state.go("login");
        }
    });

    $scope.dev = 'http://localhost:17433/';
    $scope.production = 'http://veriatodb.gear.host/';

    $scope.results;
    getData = function () {
        $http({
            method: 'GET',
            url: $scope.production + 'Api/Rest/GetChartInfo'
        })
            .then(function (response) {
                $scope.data = response.data;
            });
    };

    getData();
    
    $scope.labels = ["Insider", "Outsider", "Not Sure"];
    $scope.options = { legend: { display: true } };
    $scope.colors = ["rgb(231,76,60)", "rgb(52,152,219)", "rgb(236,240,241)"];
}

ChartController.$inject = ['$scope', '$http', '$state'];