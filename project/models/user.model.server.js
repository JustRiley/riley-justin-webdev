var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("./database");
var userModel = mongoose.model("userModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.addBook = addBook;
userModel.removeBook = removeBook;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.addFriend = addFriend;
module.exports = userModel;

function deleteUser(userId) {
    return userModel
        .findById(userId)
        .remove();
}

function addFriend(userId, username) {
    return userModel
        .findUserByUsername(username)
        .then(function (user1) {
            if(!user1){
                return;
            }else{
                return userModel
                    .findUserById(userId)
                    .then(function (user) {
                        user.friends.push(user1._id);
                        return user.save();
                    })
            }
        })
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
        .findById(userId)
        .populate("friends", "firstName")
        .populate("books", "title")
        .exec();
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}
//Array of references
function addBook(userId, bookId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.books.push(bookId);
            //writes changes to DB
            return user.save();
        })
}