/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var bookSchema = mongoose.Schema({
    title: String,
    authors: [],
    isbn: String,
    pageCount: Number,
    smallThumbnail: String
}, {collection: "book"});
module.exports = bookSchema;