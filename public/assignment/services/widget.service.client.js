/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "updateWidgetUrl": updateWidgetUrl,
            "reorderWidget": reorderWidget
        };
        return api;

        function deleteWidget(pageId, widgetId) {
            var url = "/api/page/" + pageId + "/widget/" + widgetId;
            return $http.delete(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget).then(function (response) {
                return response.data;
            })
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url).then(function (response) {
                return response.data;
            })
        }

        function updateWidgetUrl(widgetId, newUrl) {
            var url = "/api/widget/" + widgetId + "/url";
            return $http.put(url, newUrl);
        }

        function reorderWidget(pageId, start, end) {
            var url = "/api/page/" + pageId + "/widget?start=" + start + "&end=" + end;
            return $http.put(url)
                .then(function (status) {
                    return status.data;
                })

        }
    }
})();