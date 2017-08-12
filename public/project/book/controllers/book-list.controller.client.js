/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookListController", bookListController);

    function bookListController($location, $routeParams, userService, bookService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.removeBook = removeBook;

        function removeBook(book) {
            bookService
                .removeBook(model.userId, book)
                .then(function (response) {
                    $location.url("/user/" + model.userId);
                })
        }

        function init() {
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                })
        }
        init();

    }
})();