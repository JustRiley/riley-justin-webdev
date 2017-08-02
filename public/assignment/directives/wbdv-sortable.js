/**
 * Created by Justin on 8/1/2017.
 */
(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective);
    
    function widgetListDirective(widgetService, $routeParams) {
        model = this;
        model.pageId = $routeParams.pageId;
        function linkFunction(scope, element) {
            var startIndex = -1;
            var stopIndex = -1;
            element.find("ul").sortable({
                start: function (event, ui) {
                    startIndex = ($(ui.item).index());
                },
                stop: function (event, ui) {
                    stopIndex = ($(ui.item).index());
                    widgetService.sortWidget(model.pageId, startIndex, stopIndex)
                        .then(function (response) {
                            console.log("" + startIndex + " " + stopIndex);
                    });
                },
                axis: "y"
            });
        }

        return {
            link: linkFunction
        }
    }
})();
//TODO:Figure out why can't use CSS to hide bullet points