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
            var _user = userService.findUserByUsername(user.username);
            if(!_user) {
                var user1 = userService.createUser(user);
                if(!user1) {
                    model.error = "Passwords needs to match";
                } else {
                    $location.url("/user/" + user._id);
                }
            } else {
                model.error = "User already exists";
            }
        }
    }
})();