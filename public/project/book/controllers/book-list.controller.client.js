/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookListController", bookListController);

    function bookListController($location, $routeParams, userService) {
        var model = this;

        model.userId = $routeParams["userId"];


        function init() {
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                })
            /*
            bookService
                .findBooksForUser(model.userId)
                .then(function (books) {
                    model.books = books;
                })
                */
        }
        init();

    }
})();