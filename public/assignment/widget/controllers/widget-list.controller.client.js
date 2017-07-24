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
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();
//TODO:Youtube bug fix
        function trustUrlResource(url) {
            console.log(url);
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
//TODO:Widget list Youtube links won't load? ""Can't interpolate: {{widget.url}}
//Error: [$sce:insecurl] Blocked loading resource from url not allowed by $sceDelegate policy.