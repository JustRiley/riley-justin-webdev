(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {
        //JSON JavaScript object Notation

        var api = {
            "findUserByCredentials": login,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;

        //If the passwords aren't the same set user to null otherwise push to db
        //return back input
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function login(username, password) {
            var url = "/api/login";
            return $http.post(url, {username: username, password: password});
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
    }
})();