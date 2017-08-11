/**
 * Created by Justin on 8/11/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("bookNewController", bookNewController);

    function bookNewController($location, $routeParams, googleService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.searchBooks = searchBooks;
        model.addBook = addBook;

        function init() {
        }
        init();

        function addBook(book) {
            googleService
                .addBook(model.userId, book)
                .then(function (response) {
                    console.log(response);
                    $location.url("/user/" + model.userId + "/books");
                })
        }

        function searchBooks(searchTerm) {
            googleService
                .searchBooks(searchTerm)
                .then(function(response) {
                    model.books = response.data.items;
                    console.log(response.data.items[0].volumeInfo);
                });
        }
    }
})();