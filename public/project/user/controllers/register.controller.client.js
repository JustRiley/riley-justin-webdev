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
            console.log(user);
            userService.createUser(user)
                .then(function (response){
                    console.log("before reoute" + response);
                    $location.url("/login");
                });
        }
    }
})();