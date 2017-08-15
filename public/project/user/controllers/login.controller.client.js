(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope, $routeParams) {
        var model = this;

        model.userId  = $routeParams["userId"];

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }
            userService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    user = response.data;
                    if (!user) {
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = user;
                        console.log(user);
                        $location.url("user/" + user._id);
                    }
                });
        }
    }
})();