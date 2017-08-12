(function () {
    angular
        .module("BookApp")
        .factory("googleService", googleService);

    function googleService($http) {


        var key = "AIzaSyBTV1n5BxhkhDFRK-IPqlRBkpSvQwboq_k";
        var urlBase = "https://www.googleapis.com/books/v1/volumes?q=isbn:TEXT&key=API_KEY";

        var api = {
            "searchBooks": searchBooks
        };

        return api;

        //GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
        function searchBooks(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();