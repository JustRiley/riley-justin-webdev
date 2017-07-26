/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.createUser = createUser;

        function init() {

        }
        init();

        function createUser(user) {
            var promise = userService.findUserByUsername(user.username);
            promise
                .then(function (response) {

                    var _user = response.data;

                    if(_user === "0") {

                        var promise2 = userService.createUser(user);
                        promise2
                            .then(function (response){
                                var newUser = response.data;
                            if (newUser === "0") {
                                model.error = "Passwords needs to match";
                            } else {
                                $location.url("/user/" + newUser._id);
                            }
                        });
                    }
                    else
                    {
                        model.error = "User already exists";
                    }
                })
            //TODO: NEEDS work
        }
    }
})();