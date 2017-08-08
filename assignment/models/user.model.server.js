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
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
module.exports = userModel;

function deleteUser(userId) {
    return userModel
        .findById(userId)
        .remove();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

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
    return userModel
        .findById(userId)
        .populate("websites", "name")
        .exec();
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