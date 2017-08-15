(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .controller("profileController", profileController);

    function profileController($location, user, userService) {
        var model = this;
        model.userId = user._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.addFriend = addFriend;

        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
            })
        }
        init();

        function addFriend(searchText) {
            userService.addFriend(model.userId, searchText)
                .then(function () {
                    console.log("friend added");
                    $location.url("user/"+ model.userId);
            })
        }

        function updateUser() {
            userService.updateUser(model.userId, model.user)
                .then(function () {
                    model.successMessage = model.user.username + " updated successfully!";
            });
        }

        function deleteUser() {
            userService.deleteUser(model.userId)
                .then(function () {
                    $location.url("login/");
            });
        }
    }
})();