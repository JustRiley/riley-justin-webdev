(function () {
    angular
        .module("BookApp")
        .factory("bookService", bookService);

    function bookService($http) {

        var api = {
            "addBook": addBook,
            "removeBook": removeBook,
            "findBookById": findBookById,
            "findAllBooks": findAllBooks,
            "deleteBook": deleteBook
        };

        return api;

        function deleteBook(bookId) {
            var url = "/api/book/admin/delete/" + bookId;
            return $http.delete(url);
        }

        function findAllBooks() {
            var url = "/api/book/admin";
            return $http.get(url);
        }

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