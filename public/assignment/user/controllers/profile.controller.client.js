(function () {
    //iife = immediately invoked function expressions
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser() {
            userService.updateUser(userId, model.user);
        }

        function deleteUser() {
            userService.deleteUser(userId);
            $location.url("login/");
        }
    }
})();