(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {
        //JSON JavaScript object Notation

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,
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
            if(user.password + "" === user.verifyPassword + "") {
                user._id = (new Date()).getTime() + "";
                users.push(user);
                return user;
            } else {
                 return null;
            }
        }

        function findUserByCredentials(username, password) {

            var url = "/api/user/?username="+ username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = user;
                }
            }
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(u, 1);
                }
            }
        }
    }
})();