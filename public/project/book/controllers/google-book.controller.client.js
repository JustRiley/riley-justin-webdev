/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("BookApp")
        .controller("googleController", googleController);

    function googleController(googleService) {
        var model = this;
        model.searchBooksByISBN = searchBooksByISBN;
        model.searchBooksByTitle = searchBooksByTitle;
        model.books = "0";

        function searchBooksByISBN(searchTerm) {
            var isbn = "isbn";
            console.log("google book controller");
            googleService
                .searchBooks(searchTerm, isbn)
                .then(function(response) {
                    console.log("inside the promise");
                    if(response === 0) {
                        console.log("no items");
                    }
                    else {
                        console.log("in the else");
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

        function init() {
        }
        init();
    }
})();


