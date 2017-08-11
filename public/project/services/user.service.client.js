(function () {
    angular
        .module("BookApp")
        .factory("userService", userService);

    function userService($http) {
        //JSON JavaScript object Notation

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "addFriend": addFriend
        };

        return api;

        function addFriend(userId, username) {
            var url = "/api/user/"+ userId + "/friend/" + username;
            return $http.post(url);
        }

        //If the passwords aren't the same set user to null otherwise push to db
        //return back input
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user/?username="+ username + "&password=" + password;
            return $http.get(url);
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