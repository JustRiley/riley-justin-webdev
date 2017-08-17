/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookNewController", bookNewController);

    function bookNewController($location, user, googleService, bookService) {
        var model = this;

        model.userId = user._id;
        model.searchBooksByISBN = searchBooksByISBN;
        model.searchBooksByTitle = searchBooksByTitle;
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

        function searchBooksByTitle(searchTerm) {
            var query = "title";
            googleService
                .searchBooks(searchTerm, query)
                .then(function(response) {
                    if(!response.data.items) {
                        model.books = '0';
                    }
                    else {
                        model.books = response.data.items;
                    }
                });
        }

        function searchBooksByISBN(searchTerm) {
            var query = "isbn";
            googleService
                .searchBooks(searchTerm, query)
                .then(function(response) {
                    if(!response.data.items) {
                        model.books = '0';
                    }
                    else {
                        model.books = response.data.items;
                    }
                });
        }
    }
})();