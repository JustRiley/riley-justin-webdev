(function () {
    angular.module("BookApp")
        .controller("googleDetailController", googleDetailController);

    function googleDetailController(googleService, $routeParams) {
        var model = this;
        model.isbn = $routeParams.isbn;

        function init() {
            model.books = googleService.searchBooks(model.isbn)
                .then(function(response) {
                    model.books = response.data.items;
                    console.log(response.data.items[0].volumeInfo);
                });
        }
        init();
    }
})();


