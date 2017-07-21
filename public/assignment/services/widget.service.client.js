/**
 * Created by Justin on 7/19/2017.
 */
(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService() {

        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.pop(widgets[w]);
                }
            }
        }
//TODO:needs improvement
        function updateWidget(widgetId, widget) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets[w] =  widget;
                }
            }
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    return widgets[w];
                }
            }
        }

        function findWidgetsByPageId(pageId) {
            var widgetlist = [];
            for(var w in widgets){
                if(widgets[w].pageId === pageId){
                    widgetlist.push(pagers[w]);
                }
            }
            return widgetlist;
        }
    }
})();