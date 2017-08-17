/**
 * Created by Justin on 7/19/2017.
 */
//TODO: need Create for admin
(function () {
    angular
        .module("BookApp")
        .controller("adminController", adminController);

    function adminController(userService, bookService, $location, user) {
        var model = this;
        model.user = user;
        model.users = [];
        model.books = [];

        model.showAllUsers = showAllUsers;
        model.showAllBooks = showAllBooks;
        model.deleteUser = deleteUser;
        model.deleteBook = deleteBook;
        model.createUser = createUser;

        function init() {
        }
        init();

        function createUser(user) {
            model.submitted = true;

            // check to make sure the form is completely valid
            if (model.registrationForm.$valid) {
                userService.createUser(user)
                    .then(function (user) {
                        $location.url("#!/user/admin");
                    })
            }
        }

        function deleteBook(book) {
            bookService
                .deleteBook(book._id)
                .then(function (status) {
                    $location.url("#!/user/admin/");
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function (status) {
                    $location.url("#!/user/admin/");
                })
        }

        function showAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users.data;
                })
        }

        function showAllBooks() {
            bookService
                .findAllBooks()
                .then(function (books) {
                    model.books = books.data;
                })
        }

    }
})();