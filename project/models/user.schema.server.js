/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    isAdmin: {type: Boolean, default: false},
    password: String,
    firstName: String,
    lastName: String,
    pageSum: {type: Number, default: 0},
    dateCreated: {type: Date, default: Date.now},
    books: [{type: mongoose.Schema.Types.ObjectId, ref:"bookModel"}],
    friends: [{type: mongoose.Schema.Types.ObjectId, ref:"userModel"}],
    google: {
        id:    String,
        token: String
    }
}, {collection: "user"});
module.exports = userSchema;