/**
 * Created by Justin on 7/19/2017.
 */
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

        function init() {
        }
        init();

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