(function () {
    //iife = immediately invoked function expressions
    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
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
                $location.url("user/" + user._id);
            }
        }
    }
})();