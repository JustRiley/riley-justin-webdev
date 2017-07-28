/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesForUser": findWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website/";
            return $http.post(url, website);
        }

        //Unpack response in servvice not controller
        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website/";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsiteById(userId, websiteId) {
            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.get(url);
        }
    }
})();