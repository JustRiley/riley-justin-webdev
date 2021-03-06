(function () {
    angular.module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.newWidget = newWidget;
        model.heading = "HEADING";
        model.image = "IMAGE";
        model.youtube = "YOUTUBE";
        model.html = "HTML";
        model.text = "TEXT";

        function init() {
        }
        init();

        function newWidget(widgetType, widget) {
            widget.type = widgetType;
            widgetService.createWidget(model.pageId, widget)
                .then(function (newWidget) {
                    $location.url("/user/"+ model.userId +"/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
            })

        }
    }
})();