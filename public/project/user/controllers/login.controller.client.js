(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

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
                        $location.url("/user");
                    }
                });
        }
    }
})();