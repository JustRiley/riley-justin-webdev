/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("./database");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("./website.model.server");
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.findPagesForWebsite = findPagesForWebsite;
pageModel.deletePage = deletePage;

pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

module.exports = pageModel;

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}

function removeWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId);
        })
}

function createPage(websiteId, page) {
    page._website = websiteId;
    var pageTemp = null;
    return pageModel
        .create(page)
        .then (function (pageDoc) {
            pageTemp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTemp;
        })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set: page});
}

function findPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate("_website", "name")
        .exec();
}