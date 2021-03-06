/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.editPage = editPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
            });
        }
        init();

        function editPage(pageId) {
            pageService.findPageById(pageId)
                .then(function (response) {
                    if (response === null) {
                        model.errorMessage = "Page not found";
                    } else {
                        $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + pageId);
                    }
                });
        }
    }
})();