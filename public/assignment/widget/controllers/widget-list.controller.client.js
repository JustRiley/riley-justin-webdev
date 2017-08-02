/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular.module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;

        function init() {
             widgetService.findWidgetsByPageId(model.pageId)
                 .then(function (widgets) {
                    model.widgets = widgets;
             })
        }
        init();
        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(htmlContent){
            return $sce.trustAsHtml(htmlContent);
        }
    }
})();