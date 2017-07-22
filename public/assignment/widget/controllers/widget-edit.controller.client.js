(function () {
    angular.module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.wgid = $routeParams.wgid;

        function init() {
        }
        init();
    }
})();