/**
 * Created by Justin on 8/12/2017.
 */
var app = require("../../express");
var bookModel = require("../models/book.model.server");

app.post("/api/user/:userId/book/", createBook);

function createBook(req, response) {
    var book = req.body;
    var userId = req.params.userId;
    console.log("got post in book service server");
    bookModel
        .createBook(userId, book)
        .then(function (book) {
            response.json(book);
        })
}