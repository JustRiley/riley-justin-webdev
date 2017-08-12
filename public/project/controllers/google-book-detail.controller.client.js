(function () {
    angular.module("BookApp")
        .controller("googleDetailController", googleDetailController);

    function googleDetailController(userService, $routeParams) {
        var model = this;
        model.userId = $routeParams.userId;
        model.bookId = $routeParams.bookId;

        function init() {
            //TODO: Find book by bookId so we only need to render one of em.
            userService
                .findUserById(model.userId)
                .then(function (response) {
                    console.log(response);
                    model.user = response.data;
                    model.books = model.user.books;
                    console.log(model.books);
                })
        }
        init();
    }
})();


