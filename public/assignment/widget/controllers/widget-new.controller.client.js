(function () {
    angular.module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        function init() {
        }
        init();
    }
})();