(function () {
    angular.module("BookApp")
        .controller("homeDetailController", homeDetailController);

    function homeDetailController($routeParams, googleService) {
        var model = this;
        model.bookId = $routeParams["bookId"];
        var isbn = "isbn";

        function init() {
            googleService
                .searchBooks(model.bookId, isbn)
                .then(function(response) {
                    model.book = response.data.items[0];
                });
        }
        init();
    }
})();


