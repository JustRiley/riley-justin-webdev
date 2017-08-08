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


module.exports = widgetModel;

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
    return widgetModel
        .find({_page: pageId})
        .populate("_page", "name")
        .exec();
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId);
        })

}