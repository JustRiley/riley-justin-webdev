(function () {
    //iife = immediately invoked function expressions
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            var user = userService.findUserByCredentials(user.username, user.password);
            if (user === null) {
                model.errorMessage = "User not found";
            } else {
                $rootScope.currentUser = user;
                $location.url("user/" + user._id);
            }
        }
    }
})();