(function () {
    angular.module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.wgid = $routeParams.wgid;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widget = widgetService.findWidgetById(model.wgid);
        }
        init();

        function updateWidget() {
            widgetService.updateWidget(model.wgid, model.widget);
            $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.wgid);
            $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + model.pageId + "/widget/");
        }
    }
})();