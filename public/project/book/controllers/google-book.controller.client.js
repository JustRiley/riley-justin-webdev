/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("googleController", googleController);

    function googleController(googleService, $location) {
        var model = this;
        model.searchBooksByISBN = searchBooksByISBN;
        model.searchBooksByTitle = searchBooksByTitle;
        model.detailBook = detailBook;
        model.books = "0";

        function searchBooksByISBN(searchTerm) {
            var isbn = "isbn";
            googleService
                .searchBooks(searchTerm, isbn)
                .then(function(response) {
                    if(response === 0) {
                    }
                    else {
                        model.books = response.data.items;
                    }

                });
        }

        function searchBooksByTitle(searchTerm) {
            var title = "title";
            googleService.searchBooks(searchTerm, title)
                .then(function(response) {
                    model.books = response.data.items;
                });
        }

        function detailBook(book) {
            var bookId = book.id;
            console.log("in controller");
            $location.url("/details/"+bookId);
        }

        function init() {
        }
        init();
    }
})();


