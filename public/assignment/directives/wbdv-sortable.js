/**
 * Created by Justin on 8/1/2017.
 */
(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective);
    
    function widgetListDirective($http, $routeParams) {
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
                    var url = "/api/page/"+ model.pageId + "/widget?start=" + startIndex + "&end=" + stopIndex;
                    $http.put(url);
                },
                axis: "y"
            });
        }

        return {
            templateUrl: "/assignment/widget/templates/widget-list.component.client.html",
            link: linkFunction
        }
    }
})();