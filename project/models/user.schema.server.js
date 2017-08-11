/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now},
    books: [],
    friends: []
}, {collection: "user"});
module.exports = userSchema;
/*
    Embeded schemas is preferred if possible
    Not on this assignment, because schemas must be separate
 */