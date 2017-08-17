(function () {
    angular.module("BookApp")
        .controller("googleDetailController", googleDetailController);

    function googleDetailController(bookService, userService, $routeParams, user, $location) {
        var model = this;
        model.bookId = $routeParams["bookId"];
        model.userId = user._id;
        model.addToFavorites = addToFavorites;

        function init() {
            bookService
                .findBookById(model.bookId)
                .then(function (book) {
                    console.log(book);
                    model.book = book.data;
                })
        }
        init();

        function addToFavorites() {
            userService
                .addToFavorites(model.userId, model.bookId)
                .then(function () {
                    $location.url("/user/books");
                })
        }
    }
})();


