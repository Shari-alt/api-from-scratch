const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentsSchema = new Schema(
  {
    id: Id,
    firstName: String,
    lastName: String,
    course: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Students", StudentsSchema);
