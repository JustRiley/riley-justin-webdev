(function () {
    angular
        .module("BookApp")
        .factory("googleService", googleService);

    function googleService($http) {


        var key = process.env.GOOGLE_API_KEY;
        var urlBase = "https://www.googleapis.com/books/v1/volumes?q=TYPE:TEXT&key=API_KEY";

        var api = {
            "searchBooks": searchBooks
        };

        return api;

        //GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
        function searchBooks(searchTerm, queryString) {
            console.log(queryString);
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm)
                .replace("TYPE", queryString);
            return $http.get(url);
        }

    }
})();