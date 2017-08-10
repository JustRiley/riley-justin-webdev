(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService, user) {
        var model = this;
        var userId = user._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
            })
        }
        init();

        function updateUser() {
            userService.updateUser(userId, model.user)
                .then(function () {
                    model.successMessage = model.user.username + " updated successfully!";
            });
        }

        function deleteUser() {
            userService.deleteUser(userId)
                .then(function () {
                    $location.url("login/");
            });
        }
    }
})();