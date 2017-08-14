/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("googleController", googleController);

    function googleController(googleService, $routeParams) {
        var model = this;
        model.searchBooksByISBN = searchBooksByISBN;
        model.searchBooksByTitle = searchBooksByTitle;
        model.books = "0";

        function searchBooksByISBN(searchTerm) {
            var isbn = "isbn";
            googleService.searchBooks(searchTerm, isbn)
                .then(function(response) {
                    model.books = response.data.items;
                });
        }

        function searchBooksByTitle(searchTerm) {
            var title = "title";
            googleService.searchBooks(searchTerm, title)
                .then(function(response) {
                    model.books = response.data.items;
                });
        }

        function init() {
        }
        init();
    }
})();


