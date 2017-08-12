(function () {
    angular
        .module("BookApp")
        .factory("bookService", bookService);

    function bookService($http) {

        var api = {
            "addBook": addBook,
            "removeBook": removeBook
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

    }
})();