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
    console.log("book model server");
    console.log(book);
    return bookModel
        .create(book)
        .then(function (book) {
            console.log(book);
            return userModel.addBook(userId, book._id);
        });
}

function findBookById(bookId) {
    return bookModel
        .findById(bookId);
}