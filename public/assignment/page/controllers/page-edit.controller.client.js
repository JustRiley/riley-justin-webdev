(function () {
    angular.module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.updatePage = updatePage;
        model.deletePage = deletePage;
        model.editPage = editPage;

        function init() {
            model.page = pageService.findPageById(model.pageId);
            model.pages = angular.copy(pageService.findPageByWebsiteId(model.websiteId));
        }
        init();

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/");
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
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