const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Students = require("./models/students");
const Course = require("./models/course");
const { restart } = require("nodemon");

app.use(express.json());
app.use(cors());

app.post("/students", (req, res) => {
  Students.create(req.body).then((newStudent) => {
    res.status(201);
    res.json(newStudent);
  });
});

app.get("/", (req, res) => {
  res.json({
    "/courses": "nothing yet",
  });
});

mongoose.connect(`mongodb://localhost/bootcamp`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
