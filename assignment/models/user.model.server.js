/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
module.exports = userModel;

function removeWebsite(developerId, websiteId) {
    return userModel
        .findUserById(developerId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}
//Array of references
function addWebsite(developerId, websiteId) {
    return userModel
            .findUserById(developerId)
            .then(function (user) {
                user.websites.push(websiteId);
                //writes changes to DB
                return user.save();
            })
}