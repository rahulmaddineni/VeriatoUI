var HomeController = function ($scope, $http, $filter, $pusher, $state) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            $state.go("login");
        }
        
    });

    $scope.dev = 'http://localhost:17433/';
    $scope.production = 'http://veriatodb.gear.host/';


    //Pusher to get real time iinformation
    var client = new Pusher('75d54ea280ff5eed009e', {
        cluster: 'us2',
        encrypted: true
    });
    var pusher = $pusher(client);

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
        $scope.message = "Changes Updated";
        setTimeout(function () { $scope.message = "" }, 3000);
        getData();
    });
    
    $scope.colorCodeArray = [
         "#e74c3c",
         "#1488C8",
         "#2ecc71",
         "#f1c40f",
         "#f39c12",
         "#95a5a6",
         "#9b59b6",
         "#34495e"
    ];

    getData = function () {
        $http({
                method: 'GET',
                url: $scope.production + 'Api/Rest/GetLogs',
            })
            .then(function (response) {
                $scope.results = response.data;
            });
    };

    getData();

    $scope.currentPage = 0;
    $scope.pageSize = "10";
   
    $scope.numberOfPages=function(){
        return Math.ceil($scope.results.length/$scope.pageSize);                
    }
    
}

HomeController.$inject = ['$scope', '$http', '$filter', '$pusher', '$state'];


