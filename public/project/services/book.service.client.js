(function () {
    angular
        .module("BookApp")
        .factory("bookService", bookService);

    function bookService($http) {

        var api = {
            "addBook": addBook,
            "removeBook": removeBook,
            "findBookById": findBookById
        };

        return api;

        function addBook(userId, book) {
            console.log("book book service client");
            var url = "/api/user/" + userId + "/book/";
            return $http.post(url, book);
        }

        function removeBook(userId, book) {
            var url = "/api/user/" + userId + "/book/" + book;
            return $http.delete(url);

        }

        function findBookById(bookId) {
            return $http.get("/api/book/" + bookId);
        }

    }
})();