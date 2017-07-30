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
            pageService.findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
            });
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
            });
        }
        init();

        function updatePage() {
            pageService.updatePage(model.pageId, model.page).then(function (response) {
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/");
            });
        }

        function deletePage() {
            pageService.deletePage(model.pageId).then(function (response) {
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