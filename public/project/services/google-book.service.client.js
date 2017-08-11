(function () {
    angular
        .module("BookApp")
        .service("googleService", googleService);

    function googleService($http) {
        this.searchBooks = searchBooks;
        this.addBook = addBook;

        var key = "AIzaSyBTV1n5BxhkhDFRK-IPqlRBkpSvQwboq_k";
        var urlBase = "https://www.googleapis.com/books/v1/volumes?q=isbn:TEXT&key=API_KEY";

        //GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
        function searchBooks(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function addBook(userId, book) {
            console.log("google book service client");
            var url = "/api/user/" + userId + "/book/";
            return $http.post(url, book);
        }

    }
})();