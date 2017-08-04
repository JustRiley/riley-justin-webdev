(function () {
    //iife = immediately invoked function expressions
    angular
        .module("BookApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
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