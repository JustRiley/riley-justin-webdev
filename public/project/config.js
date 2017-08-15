(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: "googleController",
                controllerAs: "model"
            })
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
            .when("/user", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/:userId/books", {
                templateUrl: "book/templates/book-list.view.client.html",
                controller: "bookListController",
                controllerAs: "model"
            })
            .when("/user/:userId/books/add", {
                templateUrl: "book/templates/book-new.view.client.html",
                controller: "bookNewController",
                controllerAs: "model"
            })
            .when("/test", {
                templateUrl: "book/templates/google-book-search.view.client.html",
                controller: "googleController",
                controllerAs: "model"
            })
            .when("/user/:userId/books/:bookId", {
                templateUrl: "book/templates/google-book-detail.view.client.html",
                controller: "googleDetailController",
                controllerAs: "model"
            })
    }
    
    function checkLogin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url("/login");
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();