(function () {
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService($http) {

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
            })
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(websiteId, pageId) {
            var url = "/api/website/" + websiteId + "/page/" + pageId;
            return $http.delete(url);
        }

    }
})();