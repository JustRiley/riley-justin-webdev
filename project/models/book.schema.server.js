/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var bookSchema = mongoose.Schema({
    title: String,
    authors: [],
    description: String,
    industryIdentifiers: [],
    pageCount: Number,
    categories: [],
    imageLinks: {
        smallThumbnail: String,
        thumbnail:  String
    }
}, {collection: "book"});
module.exports = bookSchema;