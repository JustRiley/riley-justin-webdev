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
userModel.removeBookCount = removeBookCount;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findAllUsers = findAllUsers;
module.exports = userModel;

function findAllUsers() {
    return userModel.find({'isAdmin': false});
}

function findUserByGoogleId(googleId) {
        return userModel.findOne({'google.id': googleId});

}

function removeBookCount(userId, pageCount) {
    var pageSumTmp = 0;
    return userModel
        .findById(userId)
        .then(function (user) {
            pageSumTmp = user.pageSum;
            pageSumTmp -= pageCount;
            user.pageSum = pageSumTmp;
            return user.save();
        })
}

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
                return '0';
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
//Figure out how to populate multiple fields
//DONE: space seperated values in second param
function findUserById(userId) {
    return userModel
        .findById(userId)
        .populate("friends", "firstName pageSum")
        .populate("books", "title industryIdentifiers pageCount")
        .exec();
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}
//Array of references
function addBook(userId, book) {
    var bookId = book._id;
    var pageCount = book.pageCount;
    var pageSumTmp = 0;

    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.books.push(bookId);
            pageSumTmp = user.pageSum;
            pageSumTmp += pageCount;
            user.pageSum = pageSumTmp;
            //writes changes to DB
            return user.save();
        })
}