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
            .when("/details/:bookId", {
                templateUrl: "details.html",
                controller: "homeDetailController",
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
            .when("/user/books", {
                templateUrl: "book/templates/book-list.view.client.html",
                controller: "bookListController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/books/add", {
                templateUrl: "book/templates/book-new.view.client.html",
                controller: "bookNewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/admin", {
                templateUrl: "user/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin,
                    admin: checkAdmin
                }
            })
            .when("/user/admin/new", {
                templateUrl: "user/templates/admin-new-user.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin,
                    admin: checkAdmin
                }
            })
            .when("/user/admin/:userId", {
                templateUrl: "user/templates/admin-edit-user.view.client.html",
                controller: "adminEditController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/test", {
                templateUrl: "book/templates/google-book-search.view.client.html",
                controller: "googleController",
                controllerAs: "model"
            })
            .when("/user/books/:bookId", {
                templateUrl: "book/templates/google-book-detail.view.client.html",
                controller: "googleDetailController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
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

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url("/login");
                }
                else if(user.isAdmin){
                    deferred.resolve(user);
                }
                else{
                    deferred.reject();
                    $location.url("/user");
                }
            });
        return deferred.promise;
    }

})();