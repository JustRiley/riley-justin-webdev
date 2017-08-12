/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("BookApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.createUser = createUser;

        function init() {

        }
        init();

        function createUser(user) {
            userService.createUser(user)
                .then(function (user){
                    $location.url("/user/"+user.data._id);
                });
        }
    }
})();