const express = require("express");

function routes(Book) {
  const bookRouter = express.Router();

  bookRouter
    .route("/books")
    .get((req, res) => {
      const query = req.query; // = const { query } = req
      Book.find(query, (err, books) => {
        if (err) return res.send(err);
        return res.json(books);
      });
    })
    .post((req, res) => {
      console.log(req.body);
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    });

  bookRouter.route("/books/:bookId").get((req, res) => {
    const query = req.query; // = const { query } = req
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);
      return res.json(book);
    });
  });

  // REMEMBER: return bookRouter to come back out of the routes function
  return bookRouter;
}

module.exports = routes;
