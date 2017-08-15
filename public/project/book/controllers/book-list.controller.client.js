/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookListController", bookListController);

    function bookListController($location, user, userService, bookService) {
        var model = this;

        model.userId = user._id;
        model.removeBook = removeBook;

        function removeBook(book) {
            bookService
                .removeBook(model.userId, book._id, book.pageCount)
                .then(function (response) {
                    $location.url("/user");
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