/**
 * Created by Justin on 8/12/2017.
 */
var app = require("../../express");
var bookModel = require("../models/book.model.server");

app.post("/api/user/:userId/book/", createBook);
app.get("/api/book/:bookId", findBookById);
app.delete("/api/user/:userId/book/:bookId/pages/:pageCount", removeBook);


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
    bookModel
        .createBook(userId, book)
        .then(function (book) {
            response.json(book);
        })
}

function removeBook(req, response) {
    //TODO: Need to reduce the pageSum, so need to take pageCount as well
    var bookId = req.params.bodyId;
    var userId = req.params.userId;
    var pageCount = req.params.pageCount;
    bookModel
        .deleteBook(userId, bookId, pageCount)
        .then(function (status) {
            response.send(status);
        })
}

