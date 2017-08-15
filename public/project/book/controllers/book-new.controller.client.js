/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookNewController", bookNewController);

    function bookNewController($location, user, googleService, bookService) {
        var model = this;

        model.userId = user._id;
        model.searchBooks = searchBooks;
        model.addBook = addBook;

        function init() {
        }
        init();

        function addBook(book) {
            bookService
                .addBook(model.userId, book.volumeInfo)
                .then(function (response) {
                    $location.url("/user/books");
                })
        }

        function searchBooks(searchTerm) {
            var query = "isbn";
            googleService
                .searchBooks(searchTerm, query)
                .then(function(response) {
                    model.books = response.data.items;
                });
        }
    }
})();