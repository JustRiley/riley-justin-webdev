(function () {
    angular.module("BookApp")
        .controller("googleDetailController", googleDetailController);

    function googleDetailController(bookService, $routeParams) {
        var model = this;
        model.bookId = $routeParams["bookId"];

        function init() {
            bookService
                .findBookById(model.bookId)
                .then(function (book) {
                    console.log(book);
                    model.book = book.data;
                })
        }
        init();
    }
})();


