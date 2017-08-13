/**
 * Created by Justin on 8/12/2017.
 */
var app = require("../../express");
var bookModel = require("../models/book.model.server");

app.post("/api/user/:userId/book/", createBook);
app.get("/api/book/:bookId", findBookById);
app.delete("/api/user/:userId/book/:bookId", removeBook);


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
    console.log(book);
    bookModel
        .createBook(userId, book)
        .then(function (book) {
            response.json(book);
        })
}

function removeBook(req, response) {
    var bookId = req.params.bookId;
    var userId = req.params.userId;
    bookModel
        .deleteBook(userId, bookId)
        .then(function (status) {
            response.send(status);
        })
}

