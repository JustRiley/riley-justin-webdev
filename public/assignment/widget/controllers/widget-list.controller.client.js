/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();
    }
})();
//TODO:Widget list looks like shit