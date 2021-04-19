require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Students = require("./models/student");
const Course = require("./models/course");
const { restart } = require("nodemon");

app.use(express.json());
app.use(cors());

//Get Endpoints

//get a single course
app.get("/course/:courseId", (req, res) => {
  const { id } = req.params;
  Course.findById(id).then((courses) => {
    res.status(200);
    res.json(course);
  });
});

//get all courses
app.get("/course", (req, res) => {
  Course.find().then((course) => {
    res.status(200);
    res.json(course);
  });
});

//get all Students in a course
app.get("/courses/:courseId/students", (req, res) => {
  Students.find({ coure: courseId }).then((students) => {
    res.status(200);
    res.json(students);
  });
});

//get a single Student from a specific course
app.get("/courses/:courseId/studentsId", (req, res) => {
  const { studentId } = req.params;
  Students.findById(studentId).then((students) => {
    res.status(200);
    res.json(students);
  });
});

// get all students
app.get("/students", (req, res) => {
  Students.find().then((students) => {
    res.status(200);
    res.json(students);
  });
});

// get one Student
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findById(id).then((students) => {
    res.status(200);
    res.json(students);
  });
});

// Post endpoints

//post a single course
app.post("/courses", (req, res) => {
  Course.create(req.body).then((newCourse) => {
    res.status(201);
    res.json(newCourse);
  });
});

// Add a single student to a specific course
app.post("/course/:courseId/students", (req, res) => {
  const { courseId } = req.params;

  Students.create({ ...req.body, courseId }).then((newStudents) => {
    res.status(201);
    res.json(newStudents);
  });
});

// Add a student
app.post("/students", (req, res) => {
  Students.create(req.body).then((newStudent) => {
    res.status(201);
    res.json(newStudent);
  });
});

// Patch endpoints

// Edit a specific course
app.patch("/course/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndUpdate(courseId, req.body, { new: true }).then(
    (updatedCourse) => {
      res.status(200);
      res.json(updatedCourse);
    }
  );
});

//Edit a specific student
app.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findByIdAndUpdate(id, req.body, { new: true }).then(
    (updatedStudent) => {
      res.status(200);
      res.json(updatedStudent);
    }
  );
});

// Delete endpoints

//Deleting a course
app.delete("/course/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndDelete(courseId).then(() => {
    res.json("Course deleted!");
    res.status(204);
  });
});

//Deleting a single student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findByIdAndDelete(id).then((students) => {
    res.json("Post deleted!");
    res.status(204);
  });
});

const { PORT, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
