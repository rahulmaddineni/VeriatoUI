var AuthController = function ($scope, $state, firebase, authService) {
   
    $scope.loginerrmsg = "";
    $scope.regerrmsg = "";
    
    $scope.signIn = function () {
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function (reponse) {
            $state.go("home");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                $scope.loginerrmsg = 'Incorrect password!';
            }
            else if (errorCode = 'auth/invalid-email') {
                $scope.loginerrmsg = 'Please verify your login details';
            }
            else if (errorCode = 'auth/user-not-found') {
                $scope.loginerrmsg = 'Email invalid or not signed up — trying to sign you up!';
            }
            else {
            }
        });
    }

    $scope.signUp = function () {
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).then(function (response) {
            $scope.signIn();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                $scope.regerrmsg = 'Account already exists with the given email address.';
            }
            else if (errorCode = 'auth/invalid-email') {
                $scope.regerrmsg = 'Email Address not valid';
            }
            else if (errorCode = 'auth/weak-password') {
                $scope.regerrmsg = 'Password is weak! Minimum 6 characters';
            }
            else {
            }
        });
    }
}

AuthController.$inject = ['$scope', '$state', 'firebase', 'authService'];


