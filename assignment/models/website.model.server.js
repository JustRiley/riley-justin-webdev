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
module.exports = websiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then (function (websiteDoc) {
            return userModel.addWebsite(userId, websiteDoc._id);
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId},
        {$set: website});
}

function findWebsitesForUser(developerId) {
    return websiteModel.find({_user: developerId});
}