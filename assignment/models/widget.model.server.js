/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./database");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require("./page.model.server");
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetsForPage = findWidgetsForPage;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function reorderWidget(pageId, start, end) {
    return pageModel
        .findOne({_id: pageId})
        .then(function (page) {
            var widget = page.widgets.splice(start, 1);
            page.widgets.splice(end, 0, widget);
            return page.save();
        })
}


function createWidget(pageId, widget) {
    widget._page = pageId;
    var widgetTemp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc){
            widgetTemp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id);
        })
        .then(function (pageDoc) {
            return widgetTemp;
        })
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function findWidgetsForPage(pageId) {
    //Needed to use findOne, instead of find
    return pageModel
        .findOne({_id: pageId})
        .populate("widgets")
        .exec()
        .then(function (page) {
            return page.widgets;
        });
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        })

}