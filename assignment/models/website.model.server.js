/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require("./user.model.server");
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

module.exports = websiteModel;

//Array of references
function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            //writes changes to DB
            return website.save();
        })
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function deleteWebsite(developerId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel.removeWebsite(developerId, websiteId);
        })
}

function createWebsite(userId, website) {
    website._user = userId;
    var websiteTemp = null;
    return websiteModel
        .create(website)
        .then (function (websiteDoc) {
            websiteTemp = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTemp;
        })
}

function findWebsiteById(websiteId) {
    return websiteModel
        .findById(websiteId)
        .populate("pages", "name")
        .exec();
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId},
        {$set: website});
}

function findWebsitesForUser(developerId) {
    return websiteModel
        .find({_user: developerId})
        .populate("_user", "username")
        .exec();
}