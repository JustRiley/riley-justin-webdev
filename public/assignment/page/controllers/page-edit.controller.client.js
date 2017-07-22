(function () {
    angular.module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($location, $routeParams, pageService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.updatePage = updatePage;

        function init() {
            model.page = pageService.findPageById(model.pageId);
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function updatePage() {
            pageService.updatePage(model.pageId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/");
        }

        /*
         function updatePage(pageId, page) {
         for(var p in pages){
         if(pages[p]._id === pageId){
         pages[p] =  page;
         }
         }
         }
         */
    }
})();