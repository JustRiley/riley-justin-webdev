/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("BookApp")
        .controller("adminEditController", adminEditController);

    function adminEditController(userService, $routeParams, $location, user) {
        var model = this;
        model.user = user;
        model.userId = $routeParams["userId"];
        model.updateUser = updateUser;

        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.editUser = user.data;
                })
        }
        init();

        function updateUser() {
            userService.updateUser(model.userId, model.editUser)
                .then(function () {
                    model.successMessage = model.editUser.username + " updated successfully!";
                });
        }

    }
})();