/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookNewController", bookNewController);

    function bookNewController($location, $routeParams, googleService, bookService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.searchBooks = searchBooks;
        model.addBook = addBook;

        function init() {
        }
        init();

        function addBook(book) {
            bookService
                .addBook(model.userId, book.volumeInfo)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/books");
                })
        }

        function searchBooks(searchTerm) {
            googleService
                .searchBooks(searchTerm)
                .then(function(response) {
                    model.books = response.data.items;
                });
        }
    }
})();