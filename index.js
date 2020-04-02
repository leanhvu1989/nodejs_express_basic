const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const db = mongoose.connect("mongodb://localhost:27017/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // old: const db = mongoose.connect("mongodb://localhost/bookAPI");
const bookRouter = express.Router();
const Book = require("./models/bookModel");
const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  return res.send("welcome to my API");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
