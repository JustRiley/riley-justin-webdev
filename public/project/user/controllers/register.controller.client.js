/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("BookApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.registerUser = function(user) {
            model.submitted = true;

            // check to make sure the form is completely valid
            if (model.registrationForm.$valid) {
                userService.createUser(user)
                    .then(function (user) {
                        $location.url("/user");
                    })
            }

        };

        function init() {

        }
        init();
    }
})();