const mongoose = require("mongoose");

const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    id: Id,
    name: String,
    type: String,
    location: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
