(function () {
    angular
        .module("WamApp")
        .service("flickrService", flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "3f55c31a23e82e9421a75910d488d99e";
        var secret = "06ca1bd85c9452b6";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();