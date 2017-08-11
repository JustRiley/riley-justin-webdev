(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/test", {
                templateUrl: "templates/google-book-search.view.client.html",
                controller: "googleController",
                controllerAs: "model"
            })
            .when("/test/:isbn", {
                templateUrl: "templates/google-book-detail.view.client.html",
                controller: "googleDetailController",
                controllerAs: "model"
            })
    }


})();