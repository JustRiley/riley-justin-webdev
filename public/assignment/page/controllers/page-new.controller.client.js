/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.createPage = createPage;
        model.editPage = editPage;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
            });
        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page).then(function (response) {
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/");
            });
        }

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