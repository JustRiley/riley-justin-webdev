var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.addBook = addBook;
userModel.removeBook = removeBook;
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

function removeBook(userId, bookId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.books.indexOf(bookId);
            user.books.splice(index, 1);
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
        .findById(userId);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}
//Array of references
function addBook(userId, bookId) {
    console.log("user model.server");
    return userModel
        .findUserById(userId)
        .then(function (user) {
            console.log(user.books);
            user.books.push(bookId);
            console.log(user);
            //writes changes to DB
            return user.save();
        })
}