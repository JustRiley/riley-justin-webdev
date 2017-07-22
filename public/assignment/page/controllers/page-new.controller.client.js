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
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/");
        }

        function editPage(pageId) {
            var page = pageService.findPageById(pageId);
            if (page === null) {
                model.errorMessage = "Page not found";
            } else {
                $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + pageId);
            }
        }
    }
})();