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
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            })
        }
        init();

        function updateUser() {
            userService.updateUser(userId, model.user);
            model.successMessage = model.user.username + " updated successfully!";
        }

        function deleteUser() {
            userService.deleteUser(userId);
            $location.url("login/");
        }
    }
})();