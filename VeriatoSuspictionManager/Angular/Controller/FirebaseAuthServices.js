var authService = function ($firebase, firebaseUrl, firebase, $state) {

    this.isLoggedIn = function () {
        this.firebaseuser;
        firebase.auth().onAuthStateChanged(function (user) {
            this.firebaseuser = user;
        });
        return this.firebaseuser;
    }

    this.logOut = function () {
        console.log("Log out called");
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Success");
            $state.go("login");
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }
}