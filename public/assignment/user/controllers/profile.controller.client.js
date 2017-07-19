(function () {
    //iife = immediately invoked function expressions
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams) {
        var userId = $routeParams["userId"];
        for (var u in users) {
            if (users[u]._id === userId) {
                $scope.user = users[u];
            }
        }
    }
})();