const mongoose = require("mongoose");
const { Schema } = mongoose; 

const User = new Schema({
  name: String,
  studentNumber: Number,
  publishedDate: Date,
  joinIn: [Number],
  hostIn: [Number],
  createdAt: {
    type: Date,
    default: Date.now
  },
}); 

module.exports = mongoose.model("User", User);
