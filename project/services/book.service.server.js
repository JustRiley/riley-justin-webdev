/**
 * Created by Justin on 8/12/2017.
 */
var app = require("../../express");
var bookModel = require("../models/book.model.server");

app.post("/api/user/:userId/book/", createBook);
app.get("/api/book/:bookId", findBookById);


function findBookById(req, response) {
    var bookId = req.params.bookId;

    bookModel
        .findBookById(bookId)
        .then(function (book) {
            response.json(book);
        })
}

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