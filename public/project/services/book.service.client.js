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
            var url = "/api/user/" + userId + "/book/";
            return $http.post(url, book);
        }

        function removeBook(userId, bookId, pageCount) {
            var url = "/api/user/" + userId + "/book/" + bookId + "/pages/" + pageCount;
            return $http.delete(url);

        }

        function findBookById(bookId) {
            return $http.get("/api/book/" + bookId);
        }

    }
})();