/**
 * Created by Justin on 8/1/2017.
 */
(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("widgetList", widgetListDirective);
    
    function widgetListDirective($http) {
        function linkFunction(scope, element) {
            var startIndex = -1;
            var stopIndex = -1;
            element.find("ul").sortable({
                start: function (event, ui) {
                    startIndex = ($(ui.item).index());
                },
                stop: function (event, ui) {
                    stopIndex = ($(ui.item).index());
                    //TODO: Find out how to pass pageId to here. Then verify that sorting/reordering is working
                    $http.put("/page/:pageId/widget?initial=" + startIndex + "&final=" + stopIndex);
                    console.log("" + startIndex + " " + stopIndex);
                },
                axis: "y"
            });
        }

        return {
            link: linkFunction
        }
    }
})();
//TODO:Use CSS to hide bullet points