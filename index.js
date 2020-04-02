const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const db = mongoose.connect("mongodb://localhost:27017/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // old: const db = mongoose.connect("mongodb://localhost/bookAPI");
const Book = require("./models/bookModel");
const port = 3030;
const bookRouter = require("./routes/bookRouter")(Book); // REMEMBER: execute

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  return res.send("welcome to my API");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
