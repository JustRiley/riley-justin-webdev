var mongoose = require("mongoose");
var bookSchema = require("./book.schema.server");

var userModel = require("./user.model.server");
var bookModel = mongoose.model("bookModel", bookSchema);
bookModel.createBook = createBook;
bookModel.findBookById = findBookById;
bookModel.deleteBook = deleteBook;
module.exports = bookModel;

function deleteBook(bookId) {
    return bookModel
        .findById(bookId)
        .remove();
}

function createBook(userId, book) {
return bookModel
        .create(book)
        .then(function (book) {
            return userModel.addBook(userId, book);
        });
}

function findBookById(bookId) {
    return bookModel
        .findById(bookId);
}