/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("googleController", googleController);

    function googleController(googleService, $routeParams) {
        var model = this;
        model.searchBooks = searchBooks;
        model.books = "0";

        function searchBooks(searchTerm) {
            googleService.searchBooks(searchTerm)
                .then(function(response) {
                    model.books = response.data.items;
                });
        }

        function init() {
        }
        init();
    }
})();


